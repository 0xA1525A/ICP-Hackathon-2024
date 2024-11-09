// import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
// import Principal "mo:base/Principal";
// import Hash "mo:base/Hash";
import Array "mo:base/Array";
// import Random "mo:base/Random";
// import Nat32 "mo:base/Nat32";
// import Char "mo:base/Char";

actor {
    type Iden = Text;

    type AccountData = {
        firstname: Text;
        lastname: Text;
        balance: Float;
        isSuspended: Bool;
        password: Text;
    };

    // var max_user_amount: Nat = 10_000_000_000;
    let dummy_iden: Iden = "0";
    let dummy_pass: Text = "Hello World!";
    let dummy_data: AccountData = {firstname = "0"; lastname = "0"; balance = 0; isSuspended = true; password = dummy_pass};

    stable var IDENS = [dummy_iden];
    stable var DATA = [dummy_data];

    public query func replaceNullNat(nullable: ?Nat, default: Nat) : async Nat {
        switch (nullable) {
            case (?nullable) {nullable};
            case (_) {default};
        };
    };

    public func getAccount(iden: Text): async AccountData {
        let nullableIndex: ?Nat = Array.indexOf<Iden>(iden, IDENS, Text.equal);
        let index: Nat = await replaceNullNat(nullableIndex, 0);
        let accountData: AccountData = DATA[index];

        return accountData;
    };

    public shared func createAccount(iden: Text, password: Text, firstname: Text, lastname: Text): async [Iden] {
        if (Array.indexOf<Iden>(iden, IDENS, Text.equal) != null) {
            return ["\\"];
        };

        let castedIden: Iden = iden;

        let hashedPwd: Text = await hashPassword(password);

        let mIdenArray: [Iden] = Array.append<Iden>(IDENS, [castedIden]);
        let mDataArray: [AccountData] = Array.append<AccountData>(DATA, [{firstname = firstname; lastname = lastname; balance = 0; isSuspended = false; password = hashedPwd}]);

        IDENS := mIdenArray;
        DATA := mDataArray;

        return [iden];
    };

    public shared query func hashPassword(plPass: Text): async Text {
        // Felt cute, might continue later UwU.
        return plPass: Text;
    };

    public func validateLogin(iden: Text, plPass: Text): async Bool {
        if (Array.indexOf<Iden>(iden, IDENS, Text.equal) == null) {
            return false;
        };

        let nullableIndex: ?Nat = Array.indexOf<Iden>(iden, IDENS, Text.equal);
        let dataIndex: Nat = await replaceNullNat(nullableIndex, 0);

        if (dataIndex == 0) {
            return false;
        };

        let onIndexData: AccountData = DATA[dataIndex];
        let hashedPass: Text = await hashPassword(plPass);

        if (hashedPass != onIndexData.password) {
            return false;
        };

        return true;
    };

    public query func getAllIden(): async [Iden] {
        return IDENS;
    };

    public query func getAllData(): async [AccountData] {
        return DATA;
    };
};
