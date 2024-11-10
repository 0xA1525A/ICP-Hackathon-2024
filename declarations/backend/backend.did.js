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
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Float64],
        [IDL.Vec(Iden)],
        [],
      ),
    'getAllIden' : IDL.Func([], [IDL.Vec(Iden)], []),
    'getBalance' : IDL.Func([IDL.Text], [IDL.Float64], []),
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
