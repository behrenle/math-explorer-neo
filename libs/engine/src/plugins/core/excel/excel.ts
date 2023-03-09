import createPlugin from '../../../utils/plugin-builder';
import excelConstantsFragment from './fragments/excel-constants';

const excelPlugin = createPlugin({ en: 'Excel', de: 'Excel' }, 'core', { en: 'Test plugin.' })
    .addFragment(excelConstantsFragment)
    .build();

export default excelPlugin;
