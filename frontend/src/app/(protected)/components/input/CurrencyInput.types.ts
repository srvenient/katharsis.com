export interface Props {
  value: number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name: string;
  currency: 'COP' | 'USD' | 'EUR';
}