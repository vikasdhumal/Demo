import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import Modeler from 'bpmn-js/lib/Modeler';
// import propertiesPanelModule from 'bpmn-js-properties-panel';
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
// import * as camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import EmbeddedComments from 'bpmn-js-embedded-comments';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'src/assets/provider/magic'//'.//provider/magic';
import magicModdleDescriptor from  'src/assets/descriptors/magic.json';//'./descriptors/magic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Workflow Modeler';
  modeler: Modeler;
  withDiagram:boolean=false;
  withError:boolean=false;
  isOpen:boolean=false

  diagramXML:string = "<?xml version='1.0' encoding='UTF-8'?>"
  +"<bpmn2:definitions   xmlns:bpmn2='http://www.omg.org/spec/BPMN/20100524/MODEL' xmlns:bpmndi='http://www.omg.org/spec/BPMN/20100524/DI' xmlns:dc='http://www.omg.org/spec/DD/20100524/DC' xmlns:di='http://www.omg.org/spec/DD/20100524/DI' xsi:schemaLocation='http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd' id='sample-diagram' targetNamespace='http://bpmn.io/schema/bpmn'>"
  +"  <bpmn2:process id='Process_1' isExecutable='false'>"
  +"    <bpmn2:startEvent id='StartEvent_1' />"
  +"  </bpmn2:process>"
  +"  <bpmndi:BPMNDiagram id='BPMNDiagram_1'>"
  +"    <bpmndi:BPMNPlane id='BPMNPlane_1' bpmnElement='Process_1'>"
  +"      <bpmndi:BPMNShape id='_BPMNShape_StartEvent_2' bpmnElement='StartEvent_1'>"
  +"        <dc:Bounds height='36.0' width='36.0' x='412.0' y='240.0'/>"
  +"      </bpmndi:BPMNShape>"
  +"    </bpmndi:BPMNPlane>"
  +"  </bpmndi:BPMNDiagram>"
  +"</bpmn2:definitions>";

  

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.modeler = new Modeler({
      container: '#js-canvas',
      width: '100%',
      height: '600px',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        EmbeddedComments
      ],
      moddleExtensions: {
        magic: magicModdleDescriptor
      }
    });

    this.withDiagram = true;
    this.load();
    this.modeler.on('comments.updated', this.serialize);
    this.modeler.on('commandStack.changed', this.serialize)
   // this.modeler.on('comments.updated', );
    let self = this;
   this.modeler.on('shape.added', function(e) {
    var element = e.element;
    var modeling = self.modeler.get('modeling');
    switch (element.type) {
      case "bpmn:StartEvent":
        modeling.setColor(element, {
          fill: '#F3FFD8',
          stroke: '#76B233'
        });
        break;
      case "bpmn:EndEvent":
        
        break;
    }
  });
  }

  serialize () {
    //debugger;
  
    
  }
  
  

  load(): void {
    //this.getExample().subscribe(data => {
      let data ="<?xml version='1.0' encoding='UTF-8'?>"
      +"<bpmn2:definitions   xmlns:bpmn2='http://www.omg.org/spec/BPMN/20100524/MODEL' xmlns:bpmndi='http://www.omg.org/spec/BPMN/20100524/DI' xmlns:dc='http://www.omg.org/spec/DD/20100524/DC' xmlns:di='http://www.omg.org/spec/DD/20100524/DI' xsi:schemaLocation='http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd' id='sample-diagram' targetNamespace='http://bpmn.io/schema/bpmn'>"
      +"  <bpmn2:process id='Process_1' isExecutable='false'>"
      +"    <bpmn2:startEvent id='StartEvent_1' />"
      +"  </bpmn2:process>"
      +"  <bpmndi:BPMNDiagram id='BPMNDiagram_1'>"
      +"    <bpmndi:BPMNPlane id='BPMNPlane_1' bpmnElement='Process_1'>"
      +"      <bpmndi:BPMNShape id='_BPMNShape_StartEvent_2' bpmnElement='StartEvent_1'>"
      +"        <dc:Bounds height='36.0' width='36.0' x='412.0' y='240.0'/>"
      +"      </bpmndi:BPMNShape>"
      +"    </bpmndi:BPMNPlane>"
      +"  </bpmndi:BPMNDiagram>"
      +"</bpmn2:definitions>";
      this.withDiagram=true;
      this.modeler.importXML(data, value => this.handleError(value));
      this.modeler.get('comments').collapseAll();
    //});
  }

  DragOver(event):void{
    event.stopPropagation();
    event.preventDefault();

    event.dataTransfer.dropEffect = 'copy'; 
  }

  Drop(event):void{
    event.stopPropagation();
    event.preventDefault();

    var files = event.dataTransfer.files;

    var file = files[0];

    var reader = new FileReader();
    let self = this;
    reader.onload = function(e) {

      var xml = e.target.result;

      self.openDiagram(xml,self);
    };

    reader.readAsText(file);
  }

  openDiagram(xml,self) {
    self.modeler.importXML(xml, function(err) {
  
      if (err) {
       console.log("Error")
       self.withDiagram = false;
       self.withError = true;
      } else {
        self.withDiagram = true;
        self.withError = false;
      }
  
  
    });
  }
  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  public getExample(): Observable<string> {
    const url = '/assets/bpmn/initial.bpmn'; // local
    return this.http.get(url, {responseType: 'text'});
  }

   createNewDiagram():void {
    this.openDiagram(this.diagramXML,this);
  }

  

}
