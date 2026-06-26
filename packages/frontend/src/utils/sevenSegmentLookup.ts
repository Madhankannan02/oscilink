export const DIGIT_SEGMENTS: Record<number, Record<string, boolean>> = {
  0: { a:true,  b:true,  c:true,  d:true,  e:true,  f:true,  g:false, dp:false },
  1: { a:false, b:true,  c:true,  d:false, e:false, f:false, g:false, dp:false },
  2: { a:true,  b:true,  c:false, d:true,  e:true,  f:false, g:true,  dp:false },
  3: { a:true,  b:true,  c:true,  d:true,  e:false, f:false, g:true,  dp:false },
  4: { a:false, b:true,  c:true,  d:false, e:false, f:true,  g:true,  dp:false },
  5: { a:true,  b:false, c:true,  d:true,  e:false, f:true,  g:true,  dp:false },
  6: { a:true,  b:false, c:true,  d:true,  e:true,  f:true,  g:true,  dp:false },
  7: { a:true,  b:true,  c:true,  d:false, e:false, f:false, g:false, dp:false },
  8: { a:true,  b:true,  c:true,  d:true,  e:true,  f:true,  g:true,  dp:false },
  9: { a:true,  b:true,  c:true,  d:true,  e:false, f:true,  g:true,  dp:false },
};
