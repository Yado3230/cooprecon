export interface UserRequest {
  roleId: number | string;
  fullName: string;
  email: string;
  password: string;
  clientId: number;
}

export interface UserResponse {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  status: string;
  lastLoggedIn: Date;
  registeredAt: Date;
  registeredBy: string;
  updatedAt: Date;
}

export interface EditUserRequest {
  email: string;
  phoneNumber: string;
  fullName: string;
  username: string;
}

export interface BankResponse {
  id: number;
  status: string;
  name: string;
  code: string;
  payableAccount: string;
  receivableAccount: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankRequest {
  name: string;
  code: string;
  payableAccount: string;
  receivableAccount: string;
}

export interface CategoryResponse {
  id: number;
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryRequest {
  name: string;
}

export interface ProductTypeResponse {
  id: number;
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductTypeRequest {
  name: string;
}

export interface SettlementSettingResponse {
  id: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  bank: BankResponse;
  accountNumber: string;
  accountName: string;
  accountOfficer: string;
  productType: ProductTypeResponse;
  category: CategoryResponse;
}

export interface SettlementSettingRequest {
  bankId: number;
  accountNumber: string;
  accountName: string;
  accountOfficer: string;
  productTypeId: number;
  categoryId: number;
  clientId: number;
}

export interface Role {
  id: number;
  roleName: string;
  description: string;
  authorities: string[] | [];
}

export interface Login {
  username: string;
  password: string;
}

export interface HeaderTemplate {
  id: number;
  templateName: string;
  headers: string[];
  rrnColumn: string;
  txAmountColumn: string;
  dateValueColumn: string;
  status: string;
  client: {
    id: number;
    clientName: string;
    description: string;
    logo: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface HeaderTemplateRequest {
  fileTemplates: Template[];
  clientId: 0;
}

export interface Template {
  templateName: string;
  headers: string[];
  rrn: string;
}

export interface Client {
  id: number;
  clientName: string;
  description: string;
  logo: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessingTransactionTypeResponse {
  id: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface FileType {
  id: number;
  name: string;
  order: number;
  selected: boolean;
}

export interface FileTypeRequest {
  name: string;
}

export interface ProcessingTransactionTypeRequest {
  name: string;
}

export interface ReconProcessTracker {
  id: number;
  date: string;
  cbsFile: string;
  ethSwitchFile: string;
  coopSwitchFile: string;
  status: string;
  addedAt: string;
  reconFileApprovalTrackers: TransactionFile[];
  processingStartedAt: string;
  processingEndedAt: string;
}

export interface NewReconProcessTracker {
  reconProcessTrackers: ReconProcessTracker[];
}

export type TransactionFile = {
  id: number;
  fileType: string;
  fileName: string;
  totalTransactionNumber: number;
  requiredApprovals: number;
  approvalCount: number;
  addedByUserFullName: string;
  listOfApprover: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProcessingResponse = {
  id: number;
  bankName: number;
  ethCheckEJCount: number;
  doneCount: number;
  cbsCheckEJBirrAmount: number;
  cbsCheckEJCount: number;
  doneBirrAmount: number;
  ethCheckEJBirrAmount: number;
  ethCheckCoopSwitchCount: number;
  ethCheckCoopSwitchAmount: number;
  cbsCheckCoopSwitchCount: number;
  cbsCheckCoopSwitchBirrAmount: number;
};

export type ReconciliationFileETHSWITCH = {
  date: string;
  amount: number | string;
  addedAt: string;
  transactionDescription: string;
  transactionDate: string;
  acquirer: string;
  issuer: string;
  id: number;
  transferredToOtherDay: boolean;
  refNum37: string;
  cardNumber: string;
  status: "PENDING" | "DONE" | "CHECK_EJ_FILE" | "MANUAL" | "CHECK_COOP_SWITCH";
  updatedAt: string;
  transactionTime: "09:46:28";
  reconType: "REMOTE_ON_US";
};

export type ReconciliationFileCBS = {
  date: string;
  addedAt: Date;
  debitAccountNumber: string;
  transactionAmount: string;
  id: number;
  retrievalReferenceNumber: string;
  panNumber: string;
  valueDate: string;
  status: "PENDING" | "DONE" | "CHECK_EJ_FILE" | "MANUAL" | "CHECK_COOP_SWITCH";
  updatedAt: Date;
};

export type ReconciliationFileCBSData = {
  data: ReconciliationFileCBS[];
};

export type ReconciliationFileETHSWITCHData = {
  data: ReconciliationFileETHSWITCH[];
};

export type ServiceStationRequest = {
  accountNo: string;
  name: string;
  product: string;
  ccy: string;
  accountOfficer: string;
  district: string;
  terminalId: string;
  machineType: string;
  clientId: number;
};

export type ServiceStationResponse = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  accountNo: string;
  name: string;
  product: string;
  ccy: string;
  accountOfficer: string;
  district: string;
  terminalId: string;
  machineType: "NCR" | "CRM";
};
