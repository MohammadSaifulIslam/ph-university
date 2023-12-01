export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterCode = {
  [key: string]: string;
};
export type TAcademicSemester = {
  name: 'Autumn' | 'Summer' | 'Fall';
  year: string;
  code: '01' | '02' | '03';
  startMonth: TMonth;
  endMonth: TMonth;
};
