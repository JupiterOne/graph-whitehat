export interface WhitehatCurrentUser {
  id: number;
  username: string;
  isAdmin: boolean;
  privileges: string[];
  hasJumped: boolean;
  primaryClient: number;
  allSitesAdmin: number[];
  hasAssets: boolean;
}

export interface WhitehatUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  lastLogin: number;
  status: string;
  createdDate: number;
  createdBy: string;
  jobTitle: string;
  mobile: string;
  phone: string;
  dataPrivacy: boolean;
  timezone: string;
  vulnEmails: boolean;
  emailFrequency: { daily: boolean; weekly: boolean; monthly: boolean };
}

export interface WhitehatRole {
  id: number;
  name: string;
}

export interface WhitehatSite {
  id: number;
  clientID: number;
  name: string;
  organization: string;
  abbreviation: string;
  hostname: string;
  associatedHostname: string;
  industry: string;
  weight: number;
  speed: number;
  usesSatellite: boolean;
}

export interface WhitehatApplication {
  autoremediation: number;
  files: { extension: string; count: number }[];
  open_vuln_count: string;
  vulns_found_by_engine: number;
  asset_scan_status: string;
  last_scan_duration: number;
  status: string;
  line_of_code: string;
  client_id: number;
  has_schedule: number;
  last_scan_completed: string;
  percentage_of_lines_sent_to_whitehat: number;
  label: string;
  id: number;
  file_size_scanned: string;
  language: string;
  created_t: string;
  service_level: string;
  app_full_scan_enabled: number;
  is_mobile_bla: number;
  href: string;
  is_mobile: number;
}

export interface WhitehatRoleResponse {
  collection: WhitehatRole[];
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

export interface WhitehatGroup {
  id: number;
  name: string;
  description: string;
  created: number;
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

export interface WhitehatEventSubscriptions {
  subscriptionGroupType: string;
  allEventsSubscribed: boolean;
  subscriptionGroupEvents: {
    value: number;
    description: string;
    subscribed: boolean;
  }[];
}

export interface WhitehatEventSubscriptionsResponse {
  page: {
    totalCount: number;
  };
  collection: WhitehatEventSubscriptions[];
}
export interface WhitehatFinding {
  id: number;
  asset: {
    id: number;
    name: string;
    type: string;
    rating: string;
    serviceLevel: number;
    subID: number;
    clientID: number;
    status: boolean;
    customPolicyID: number;
  };
  class: {
    id: number;
    name: string;
    shortName: string;
    defaultRisk: number;
    retired: boolean;
    hasApplications: boolean;
    hasSites: boolean;
  };
  location: string;
  foundRevision: string;
  status: string;
  nonAcceptedStatus: string;
  severity: number;
  threat: number;
  impact: number;
  impactRating: string;
  likelihood: number;
  likelihoodRating: string;
  risk: number;
  customRisk: number;
  customAccepted: boolean;
  reason: string;
  hasInstanceLevelCustomization: boolean;
  hasInstanceLevelCVSSCustomization: boolean;
  lastRetested: number;
  retestStatus: string;
  firstOpened: string;
  opened: string;
  closed: number;
  lastModified: string;
  tags: string[];
  zeroDayTags: string[];
  cveTags: string[];
  subTypeTags: string[];
  directRemediationAvailable: boolean;
  unreachable: boolean;
  attackVectorsCount: number;
  notesCount: number;
  isAccessible: boolean;
  outOfScopeReasons: string[];
  attackVectors: number[];
  verificationStatus: string;
  manual: boolean;
}

export interface WhitehatCodebaseResponse {
  collection: WhitehatCodebase[];
  type: string;
  href: string;
}

export interface WhitehatCodebase {
  file_name: string;
  file_tree_json: string;
  repository_type: string;
  id: string;
  certificate: string;
  auth_type: string;
  exclude_dirs: string[];
  href: string;
  username: string;
  repository_revision: string;
  label: string;
  repository_url: string;
}
