import { useEffect } from 'react';

const useMountEffect = (fn: () => any) => useEffect(fn, []);

export default useMountEffect;
