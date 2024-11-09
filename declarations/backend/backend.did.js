export const idlFactory = ({ IDL }) => {
  const Iden = IDL.Text;
  const AccountData = IDL.Record({
    'firstname' : IDL.Text,
    'balance' : IDL.Float64,
    'password' : IDL.Text,
    'isSuspended' : IDL.Bool,
    'lastname' : IDL.Text,
  });
  return IDL.Service({
    'createAccount' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Vec(Iden)],
        [],
      ),
    'getAccount' : IDL.Func([IDL.Text], [AccountData], []),
    'getAllData' : IDL.Func([], [IDL.Vec(AccountData)], ['query']),
    'getAllIden' : IDL.Func([], [IDL.Vec(Iden)], ['query']),
    'hashPassword' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'replaceNullNat' : IDL.Func(
        [IDL.Opt(IDL.Nat), IDL.Nat],
        [IDL.Nat],
        ['query'],
      ),
    'validateLogin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
