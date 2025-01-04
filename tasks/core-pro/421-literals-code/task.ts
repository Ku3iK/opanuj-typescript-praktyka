type SingleCodeValue = 0 | 1;

type CodeSegment = `${SingleCodeValue}${SingleCodeValue}${SingleCodeValue}`;

export type Code = `${CodeSegment}-${CodeSegment}-${CodeSegment}`;

export function codeToDecimal(code: Code) {
  const codeSegments = code.split('-');
  const decimalSegments = codeSegments.map((code) => parseInt(code, 2));

  return decimalSegments.join('');
}
