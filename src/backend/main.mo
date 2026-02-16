import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

// Migrate previous persistent state

actor {
  // Include authorization (administration of access roles and authentication)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type as required by frontend
  public type UserProfile = {
    name : Text;
    email : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Profile data representing the bio and contact information
  public type Profile = {
    displayName : Text;
    bio : Text;
    email : Text;
    phone : ?Text;
    socialLinks : [Text];
  };

  // Work item data representing a work entry in the portfolio
  public type WorkItem = {
    id : Nat;
    title : Text;
    description : Text;
    link : ?Text;
    date : Time.Time;
    orderIndex : Int; // Used for ordering
    isVideo : Bool; // New flag to indicate work items that are videos
  };

  // State variables
  var initialized : Bool = false;
  var nextWorkItemId = 0;
  var profile : ?Profile = null;
  let workItems = Map.empty<Nat, WorkItem>();

  // -- Ordering --
  module WorkItem {
    public func compareByOrderIndex(w1 : WorkItem, w2 : WorkItem) : Order.Order {
      Int.compare(w1.orderIndex, w2.orderIndex);
    };
  };

  //------------------------------------------------------
  // User Profile Management (Required by Frontend)
  //------------------------------------------------------
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(userProfile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, userProfile);
  };

  //------------------------------------------------------
  // Admin Management (First Initialization Sets Owner)
  //------------------------------------------------------
  public shared ({ caller }) func initialize(adminToken : Text, userProvidedToken : Text) : async () {
    AccessControl.initialize(accessControlState, caller, adminToken, userProvidedToken);
    initialized := true;
    Debug.print("Portfolio initialized: admin=" # caller.toText());
  };

  public query ({ caller }) func isOwner() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  //------------------------------------------------------
  // Profile APIs (Public Portfolio Data)
  //------------------------------------------------------
  // Public query - anyone can view the portfolio profile
  public query func getProfile() : async ?Profile {
    profile;
  };

  // Admin-only mutation
  public shared ({ caller }) func updateProfile(newProfile : Profile) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the portfolio owner can update the profile");
    };
    profile := ?newProfile;
  };

  //------------------------------------------------------
  // Work Item APIs (Public Portfolio Data)
  //------------------------------------------------------
  // Public query - anyone can view work items
  public query func getAllWorkItems() : async [WorkItem] {
    workItems.values().toArray().sort(WorkItem.compareByOrderIndex);
  };

  // Public query - anyone can view a specific work item
  public query func getWorkItem(id : Nat) : async ?WorkItem {
    workItems.get(id);
  };

  public query ({ caller }) func getVideoWorkItems() : async [WorkItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view video work items");
    };

    let filtered = workItems.values().toArray().filter(
      func(workItem) {
        workItem.isVideo;
      }
    );
    filtered.sort(WorkItem.compareByOrderIndex);
  };

  // Admin-only mutation
  public shared ({ caller }) func addWorkItem(newWork : { title : Text; description : Text; link : ?Text; isVideo : Bool }) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the portfolio owner can add new work items");
    };

    let workItem : WorkItem = {
      id = nextWorkItemId;
      title = newWork.title;
      description = newWork.description;
      link = newWork.link;
      date = Time.now();
      orderIndex = workItems.size().toInt();
      isVideo = newWork.isVideo;
    };

    workItems.add(nextWorkItemId, workItem);

    nextWorkItemId += 1;
    workItem.id;
  };

  // Admin-only mutation
  public shared ({ caller }) func deleteWorkItem(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the portfolio owner can delete work items");
    };

    switch (workItems.get(id)) {
      case (null) { Runtime.trap("Could not delete work item. Not found") };
      case (?_) {
        workItems.remove(id);
      };
    };
  };

  // Admin-only mutation
  public shared ({ caller }) func reorderWorkItems(newOrderIds : [Nat]) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only the portfolio owner can reorder work items");
    };

    var index = 0;
    for (id in newOrderIds.values()) {
      let current = index;
      switch (workItems.get(id)) {
        case (?existing) {
          let updated : WorkItem = {
            id = existing.id;
            title = existing.title;
            description = existing.description;
            link = existing.link;
            date = existing.date;
            orderIndex = current;
            isVideo = existing.isVideo;
          };
          workItems.add(id, updated);
        };
        case (null) {};
      };
      index += 1;
    };
  };
};
