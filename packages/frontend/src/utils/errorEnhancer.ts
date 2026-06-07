import { CompilationError } from '../types/simulation';

export function enhanceError(error: CompilationError): CompilationError {
  const enhanced = { ...error };
  const msg = error.message.toLowerCase();

  if (msg.includes('was not declared in this scope')) {
    enhanced.hint = 'Check spelling or missing include';
  } else if (msg.includes("expected ';'")) {
    enhanced.hint = 'Missing semicolon on previous line';
  } else if (msg.includes('no matching function for call')) {
    enhanced.hint = 'Wrong number or types of arguments';
  } else if (msg.includes('servo') || msg.includes('liquidcrystal')) {
    enhanced.hint = 'Specific include directive needed (e.g. #include <Servo.h>)';
  } else if (msg.includes('return-statement with a value, in function returning')) {
    enhanced.hint = 'Type mismatch in return statement';
  } else if (msg.includes('expected primary-expression before') || msg.includes('expected unqualified-id before')) {
    enhanced.hint = 'Syntax error or unexpected token';
  }

  return enhanced;
}
