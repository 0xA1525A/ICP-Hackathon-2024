import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor {
    type Iden = Text;

    type AccountData = {
        firstname: Text;
        lastname: Text;
        balance: Float;
        isSuspended: Bool;
        password: Text;
    };

    type History = {
        sender: Iden;
        receiver: Iden;
        amount: Float;
    };

    // max_user_amount: Nat = 10_000_000_000;
    let dummyIden: Iden = "0";
    let dummyPass: Text = "Hello World!";
    let dummyData: AccountData = {
        firstname = "0";
        lastname = "0";
        balance = 0.0;
        isSuspended = true;
        password = dummyPass
    };
    let dummy_hist: History = {
        sender = "0";
        receiver = "0";
        amount = 0.0;
    };

    private stable var IDENS = [dummyIden];
    private stable var DATA = [var dummyData];
    private stable var HIST = [dummy_hist];

    private func getIndex(iden: Text): ?Nat {
        return Array.indexOf<Iden>(iden, IDENS, Text.equal);
    };

    private func replaceNull<T>(nullable: ?T, default: T): T {
        switch (nullable) {
            case (?nullable) {nullable};
            case (_) {default};
        };
    };

    public query func getData(iden: Iden): async AccountData {
        let nullableIndex: ?Nat = getIndex(iden);
        let index: Nat = replaceNull<Nat>(nullableIndex, 0);

        return DATA[index];
    };

    public query func getBalance(iden: Text): async Float {
        let nullableIndex: ?Nat = getIndex(iden);
        let index: Nat = replaceNull<Nat>(nullableIndex, 0);
        return DATA[index].balance;
    };

    public query func getHistory(iden: Iden): async [History] {
        let history: [History] = Array.filter<History>(HIST, func({sender: Iden; receiver: Iden; amount: Float}): Bool { return sender == iden or receiver == iden; });
        return history;
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

    public query func dumpHistory(): async [History] {
        return HIST;
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

    public query func dumpIden(): async [Iden] {
        return IDENS;
    };

    public func transfer(sender: Iden, receiver: Iden, amount: Float): async [AccountData] {
        if (sender == receiver) {
            return [DATA[0], DATA[0]];
        };

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

        let newHistory: History = {
            sender = sender;
            receiver = receiver;
            amount = amount;
        };

        let mHist = Array.append<History>(HIST, [newHistory]);

        HIST := mHist;

        return [DATA[senderIndex], DATA[receiverIndex]];
    };
};
