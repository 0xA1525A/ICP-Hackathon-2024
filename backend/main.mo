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

    // max_user_amount: Nat = 10_000_000_000;
    let dummy_iden: Iden = "0";
    let dummy_pass: Text = "Hello World!";
    let dummy_data: AccountData = {
        firstname = "0";
        lastname = "0";
        balance = 0.0;
        isSuspended = true;
        password = dummy_pass
    };

    private stable var IDENS = [dummy_iden];
    private stable var DATA = [var dummy_data];

    private func getIndex(iden: Text): ?Nat {
        return Array.indexOf<Iden>(iden, IDENS, Text.equal);
    };

    private func replaceNull<T>(nullable: ?T, default: T): T {
        switch (nullable) {
            case (?nullable) {nullable};
            case (_) {default};
        };
    };

    public func getBalance(iden: Text): async Float {
        let nullableIndex: ?Nat = getIndex(iden);
        let index: Nat = replaceNull<Nat>(nullableIndex, 0);
        return DATA[index].balance;
    };

    public func createAccount(iden: Text, password: Text, firstname: Text, lastname: Text, balance: Float): async [Iden] {
        if (getIndex(iden) != null or iden == "" or password == "" or firstname == "" or lastname == "") {
            return ["\\"];
        };

        let castedIden: Iden = iden;

        let hashedPwd: Text = await hashPassword(password);

        let mIdenArray = Array.append<Iden>(IDENS, [castedIden]);
        let mDataArray = Array.append<AccountData>(Array.freeze(DATA), [{
            firstname = firstname;
            lastname = lastname;
            balance = balance;
            isSuspended = false;
            password = hashedPwd
        }]);

        IDENS := mIdenArray;
        DATA := Array.thaw(mDataArray);

        return [iden];
    };

    public func hashPassword(plPass: Text): async Text {
        // Felt cute, might continue later UwU.
        return plPass: Text;
    };

    public func validateLogin(iden: Text, plPass: Text): async Bool {
        if (getIndex(iden) == null) {
            return false;
        };

        let nullableIndex: ?Nat = getIndex(iden);
        let dataIndex: Nat = replaceNull<Nat>(nullableIndex, 0);

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

    public func getAllIden(): async [Iden] {
        return IDENS;
    };

    public func transfer(sender: Iden, receiver: Iden, amount: Float): async [AccountData] {
        let senderIndexNullable: ?Nat = getIndex(sender);
        let receiverIndexNullable: ?Nat = getIndex(receiver);

        if (senderIndexNullable == null or receiverIndexNullable == null) {
            return [DATA[0], DATA[0]];
        };

        let senderIndex: Nat = replaceNull<Nat>(senderIndexNullable, 0);
        let receiverIndex: Nat = replaceNull<Nat>(receiverIndexNullable, 0);

        let senderBalance: Float = DATA[senderIndex].balance;
        let receiverBalance: Float = DATA[receiverIndex].balance;

        if (amount > senderBalance) {
            return [DATA[0], DATA[0]];
        };

        let oldSenderData: AccountData = DATA[senderIndex];
        let oldReceiverData: AccountData = DATA[receiverIndex];

        let newSenderData: AccountData = {
            firstname = oldSenderData.firstname;
            lastname = oldSenderData.lastname;
            balance = senderBalance - amount;
            isSuspended = oldSenderData.isSuspended;
            password = oldSenderData.password;
        };

        let newReceiverData: AccountData = {
            firstname = oldReceiverData.firstname;
            lastname = oldReceiverData.lastname;
            balance = receiverBalance + amount;
            isSuspended = oldReceiverData.isSuspended;
            password = oldReceiverData.password;
        };

        let mData = DATA;

        mData[senderIndex] := newSenderData;
        mData[receiverIndex] := newReceiverData;

        DATA := mData;

        return [DATA[senderIndex], DATA[receiverIndex]];
    };
};
