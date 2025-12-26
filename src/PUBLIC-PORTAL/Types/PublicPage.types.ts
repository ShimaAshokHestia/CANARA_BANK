// src/ADMIN-PORTAL/Types/CMS/PublicPage.types.ts

export interface NavbarMenuItem {
  label: string;
  route: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FooterQuickLink {
  label: string;
  route: string;
}

export interface FooterOfficeHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface PublicPage {
  publicPageId: number;

  /* Navbar */
  navbarTitle: string;
  navbarSubTitle: string;
  navbarLogoAlt: string;
  navbarMenuHead: string;
  navbarMenuJson: string; // stored as JSON string
  navbarLoginLabel: string;
  navbarLoginIconClass: string;
  navbarPhone: string;
  navbarEmail: string;

  /* Hero Section */
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroTitleLine3: string;
  heroDescription: string;
  heroPrimaryBtnLabel: string;
  heroPrimaryBtnRoute: string;
  heroSecondaryBtnLabel: string;
  heroSecondaryBtnRoute: string;

  /* Features Section */
  featuresHeadingLabel: string;
  featuresHeadingTitle: string;
  featuresHeadingSubtitle: string;
  featuresItemsJson: string; // stored as JSON string

  /* Footer */
  footerShortName: string;
  footerSubtitle: string;
  footerDescription: string;
  footerAddress1: string;
  footerAddress2: string;
  footerPhone: string;
  footerEmail: string;
  footerQuickLinksJson: string; // stored as JSON string
  footerOfficeHoursJson: string; // stored as JSON string
  footerBottomBarText: string;
}
