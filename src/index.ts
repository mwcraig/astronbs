import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the astronbs extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'astronbs:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension astronbs is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('astronbs settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for astronbs.', reason);
        });
    }

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The astronbs server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
