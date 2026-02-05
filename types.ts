
export interface BookingData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  serviceType: 'privé' | 'conventionné' | 'aéroport';
}

export interface NavItem {
  label: string;
  href: string;
}
