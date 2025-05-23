export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken'
} as const

export const Role = {
  Owner: 'Owner',
  Employee: 'Employee'
} as const

export const RoleValues = [Role.Owner, Role.Employee] as const

export const DishStatus = {
  Available: 'Available',
  Unavailable: 'Unavailable',
  Hidden: 'Hidden'
} as const

export const DishStatusValues = [DishStatus.Available, DishStatus.Unavailable, DishStatus.Hidden] as const

export const TableStatus = {
  Available: 'Available',
  Hidden: 'Hidden',
  Reserved: 'Reserved'
} as const

export const TableStatusValues = [TableStatus.Available, TableStatus.Hidden, TableStatus.Reserved] as const
