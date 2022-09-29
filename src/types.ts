export interface WhitehatUser {
  id: number;
  username: string;
  isAdmin: boolean;
  privileges: string[];
  hasJumped: boolean;
  primaryClient: number;
  allSitesAdmin: number[];
  hasAssets: boolean;
}

export interface WhitehatAsset {
  id: number;
  subID: number;
  name: string;
  type: string;
  location: string[];
  serviceLevel: string;
  clientRatingMethod: string;
  phase: string;
  status: string;
  customAssetID: string;
  tags: string[];
  scheduleName: string;
  scheduleTimeZone: string;
  creationT: number;
  lang: string;
  averageLinesScanned: number;
  lastScanDateT: number;
  scanStatus: string;
  isWhiteHatEnabled: boolean;
  activeUser: boolean;
  keepUnreachableFindingsOpen: { Bool: boolean; Valid: boolean };
}

export interface WhitehatAppScan {
  id: number;
  tag: string;
  filename: string;
  requestedBy: number;
  username: string;
  uploadedOn: string;
  completedOn: string;
  applicationSize: number;
  linesOfCode: number;
  appID: number;
  assetID: number;
  status: string;
  engineConf: {
    binary_exclusions: string;
    binary_inclusions: string;
    exclude_directories: string;
    exclude_directories_console: string;
  };
  instanceID: number;
}

export interface WhitehatSiteScan {
  has_running_scan: number;
  total: number;
  slot_id: string;
  collection: {
    is_non_auth: number;
    end_date: string;
    cred_group_name: string;
    auth_schema_id: number;
    scan_instance_id: string;
  }[];
  href: string;
}
