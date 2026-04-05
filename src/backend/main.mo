import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";

actor {
  type User = {
    id : Text;
    name : Text;
    mobile : Text;
    email : Text;
    passwordHash : Text;
    role : Text;
    status : Text;
    aadhaar : Text;
    pan : Text;
    fatherName : Text;
    dob : Text;
    gender : Text;
    address : Text;
    district : Text;
    state : Text;
    pincode : Text;
    nomineeName : Text;
    nomineeRelation : Text;
    designation : Text;
    isVerified : Bool;
    createdAt : Time.Time;
  };

  type KycRecord = {
    userId : Text;
    aadhaarDoc : Text;
    panDoc : Text;
    photo : Text;
    addressProof : Text;
    bankDetails : Text;
    status : Text;
    remark : Text;
    updatedAt : Time.Time;
  };

  type Application = {
    id : Text;
    applicationType : Text;
    applicantName : Text;
    applicantEmail : Text;
    applicantPhone : Text;
    data : Text;
    status : Text;
    adminRemark : Text;
    createdAt : Time.Time;
  };

  type Review = {
    id : Text;
    reviewerName : Text;
    rating : Nat;
    comment : Text;
    isApproved : Bool;
    createdAt : Time.Time;
  };

  module User {
    public func compare(user1 : User, user2 : User) : Order.Order {
      Text.compare(user1.id, user2.id);
    };
  };

  module KycRecord {
    public func compare(record1 : KycRecord, record2 : KycRecord) : Order.Order {
      Text.compare(record1.userId, record2.userId);
    };
  };

  module Application {
    public func compare(app1 : Application, app2 : Application) : Order.Order {
      Text.compare(app1.id, app2.id);
    };
  };

  module Review {
    public func compare(review1 : Review, review2 : Review) : Order.Order {
      Text.compare(review1.id, review2.id);
    };
  };

  let contentStore = Map.empty<Text, Text>();
  let userStore = Map.empty<Text, User>();
  let kycStore = Map.empty<Text, KycRecord>();
  let applicationStore = Map.empty<Text, Application>();
  let reviewStore = Map.empty<Text, Review>();

  // Unique ID generator
  var idCounter = 0;

  func generateId() : Text {
    idCounter += 1;
    idCounter.toText();
  };

  func getUserInternal(id : Text) : User {
    switch (userStore.get(id)) {
      case (null) { Runtime.trap("User does not exist! ") };
      case (?user) { user };
    };
  };

  func getKycRecordInternal(id : Text) : KycRecord {
    switch (kycStore.get(id)) {
      case (null) { Runtime.trap("KycRecord does not exist! ") };
      case (?record) { record };
    };
  };

  func getApplicationInternal(id : Text) : Application {
    switch (applicationStore.get(id)) {
      case (null) { Runtime.trap("Application does not exist! ") };
      case (?app) { app };
    };
  };

  func getReviewInternal(id : Text) : Review {
    switch (reviewStore.get(id)) {
      case (null) { Runtime.trap("Review does not exist! ") };
      case (?review) { review };
    };
  };

  // Content Store Methods
  public shared ({ caller }) func saveContent(key : Text, value : Text) : async () {
    contentStore.add(key, value);
  };

  public query ({ caller }) func getContent(key : Text) : async ?Text {
    contentStore.get(key);
  };

  public query ({ caller }) func getAllContent() : async [(Text, Text)] {
    contentStore.entries().toArray();
  };

  // User Management Methods
  public shared ({ caller }) func createUser(user : User) : async Text {
    let id = generateId();
    let newUser : User = {
      user with
      id;
      createdAt = Time.now();
      status = "pending";
    };
    userStore.add(id, newUser);
    id;
  };

  public query ({ caller }) func getUser(id : Text) : async ?User {
    userStore.get(id);
  };

  public query ({ caller }) func getUserByEmail(email : Text) : async ?User {
    userStore.values().find(
      func(user) { user.email == email }
    );
  };

  public query ({ caller }) func getAllUsers() : async [User] {
    userStore.values().toArray().sort();
  };

  public shared ({ caller }) func updateUser(id : Text, user : User) : async Bool {
    if (not userStore.containsKey(id)) { Runtime.trap("User does not exist! ") };
    let updatedUser : User = {
      user with
      id;
    };
    userStore.add(id, updatedUser);
    true;
  };

  public shared ({ caller }) func deleteUser(id : Text) : async Bool {
    if (not userStore.containsKey(id)) { Runtime.trap("User does not exist! ") };
    userStore.remove(id);
    true;
  };

  // KYC Methods
  public shared ({ caller }) func saveKyc(record : KycRecord) : async () {
    let newRecord : KycRecord = {
      record with
      status = "pending";
      updatedAt = Time.now();
    };
    kycStore.add(record.userId, newRecord);
  };

  public query ({ caller }) func getKyc(userId : Text) : async ?KycRecord {
    kycStore.get(userId);
  };

  public query ({ caller }) func getAllKyc() : async [KycRecord] {
    kycStore.values().toArray().sort();
  };

  public shared ({ caller }) func updateKycStatus(userId : Text, status : Text, remark : Text) : async Bool {
    let record = getKycRecordInternal(userId);
    let updatedRecord : KycRecord = {
      record with
      status;
      remark;
      updatedAt = Time.now();
    };
    kycStore.add(userId, updatedRecord);
    true;
  };

  // Application Store Methods
  public shared ({ caller }) func submitApplication(app : Application) : async Text {
    let id = generateId();
    let newApp : Application = {
      app with
      id;
      status = "pending";
      createdAt = Time.now();
    };
    applicationStore.add(id, newApp);
    id;
  };

  public query ({ caller }) func getApplication(id : Text) : async ?Application {
    applicationStore.get(id);
  };

  public query ({ caller }) func getAllApplications() : async [Application] {
    applicationStore.values().toArray().sort();
  };

  public shared ({ caller }) func updateApplicationStatus(id : Text, status : Text, remark : Text) : async Bool {
    let app = getApplicationInternal(id);
    let updatedApp : Application = {
      app with
      status;
      adminRemark = remark;
    };
    applicationStore.add(id, updatedApp);
    true;
  };

  // Review Methods
  public shared ({ caller }) func submitReview(review : Review) : async Text {
    let id = generateId();
    let newReview : Review = {
      review with
      id;
      isApproved = false;
      createdAt = Time.now();
    };
    reviewStore.add(id, newReview);
    id;
  };

  public query ({ caller }) func getAllReviews() : async [Review] {
    reviewStore.values().toArray().sort();
  };

  public shared ({ caller }) func approveReview(id : Text) : async Bool {
    let review = getReviewInternal(id);
    let updatedReview : Review = {
      review with
      isApproved = true;
    };
    reviewStore.add(id, updatedReview);
    true;
  };

  public shared ({ caller }) func deleteReview(id : Text) : async Bool {
    if (not reviewStore.containsKey(id)) { Runtime.trap("Review does not exist! ") };
    reviewStore.remove(id);
    true;
  };
};
