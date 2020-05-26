import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';


export default function(group, element,customOptions) {

  // Only return an entry, if the currently selected
  // element is a start event.

  //if (is(element, 'bpmn:StartEvent')) {
    group.entries.push(entryFactory.textField({
      id : 'name',
      description : 'This is lable',
      label : 'Name',
      modelProperty : 'name'
    }));

  //   if (is(element, 'bpmn:StartEvent')) {group.entries.push(entryFactory.table({
  //      id : 'newTable', 
  //     labels: [ 'Comments'], 
  //     canBeShown: true, 
  //     addLabel: 'Add Entry', 
  //     description : 'This is table',
  //     modelProperties: [ 'key', 'value' ]
  //   }));
  // }


    
  //}

 

}