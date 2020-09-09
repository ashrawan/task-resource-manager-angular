export interface SideNavGroups {
  text?: string;
  items: string[];
}

export interface SideNavGroupItems {
  [index: string]: SideNavItem;
}

export interface SideNavItem {
  icon?: string;
  text: string;
  link?: string;
  requiredAdminAccess?: boolean;
  submenu?: SideNavItem[];
}


