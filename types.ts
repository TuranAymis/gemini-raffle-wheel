
export interface Participant {
  id: string;
  name: string;
  color: string;
}

export enum SegmentType {
  PARTICIPANT = 'PARTICIPANT',
  PASS = 'PASS',
  BANKRUPT = 'BANKRUPT'
}

export interface WheelSegment {
  label: string;
  type: SegmentType;
  color: string;
}
