export const idlFactory = ({ IDL }) => {
  const Iden = IDL.Text;
  const History = IDL.Record({
    'sender' : Iden,
    'amount' : IDL.Float64,
    'receiver' : Iden,
  });
  const AccountData = IDL.Record({
    'firstname' : IDL.Text,
    'balance' : IDL.Float64,
    'password' : IDL.Text,
    'isSuspended' : IDL.Bool,
    'lastname' : IDL.Text,
  });
  return IDL.Service({
    'createAccount' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Float64],
        [IDL.Vec(Iden)],
        [],
      ),
    'dumpHistory' : IDL.Func([], [IDL.Vec(History)], ['query']),
    'dumpIden' : IDL.Func([], [IDL.Vec(Iden)], ['query']),
    'getBalance' : IDL.Func([IDL.Text], [IDL.Float64], ['query']),
    'getData' : IDL.Func([Iden], [AccountData], ['query']),
    'getHistory' : IDL.Func([Iden], [IDL.Vec(History)], ['query']),
    'hashPassword' : IDL.Func([IDL.Text], [IDL.Text], []),
    'transfer' : IDL.Func(
        [Iden, Iden, IDL.Float64],
        [IDL.Vec(AccountData)],
        [],
      ),
    'validateLogin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
