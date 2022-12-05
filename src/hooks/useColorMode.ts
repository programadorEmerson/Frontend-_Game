import { useContext } from 'react';

import { ColorModeContext } from '@/contexts/ColorMode';

const useColorMode = () => useContext(ColorModeContext);

export default useColorMode;
