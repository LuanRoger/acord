export interface Activity {
  state: string;
  details: string;
  startTimestamp?: number | Date;
  endTimestamp?: number | Date;
  largeImageKey?: string;
  smallImageKey?: string;
  largeImageText?: string;
  smallImageText?: string;
  dominantColor?: string;
}

export interface ActivityMetadata {
  previousActivity: Activity | undefined;
  lastActivityUpdateTimestamp: number | undefined;
  lastActivityUpdateDate: Date | undefined;
  lastAccessActivityDate: Date | undefined;
}
