const fs = require('fs');
const rl = require('readline');

let nameComponent = '';
const prompts = rl.createInterface(process.stdin, process.stdout);

prompts.question('Qual nome do componente que será criado?', (answer) => {
    nameComponent = answer;

    if (!fs.existsSync(nameComponent)) {
        fs.mkdirSync(nameComponent)
    }

    const componentStructure =
        `(function () {
        'use strict';
    
        angular
            .module('your.module')
            .component('${nameComponent}', ${nameComponent}Config());
            
        function ${nameComponent}Config() {
            return {
                templateUrl: '/components/${nameComponent}/${nameComponent}.template.html',
                controller: ${nameComponent}ComponentController,
                bindings: {
                }
            }
        }
    
        /* @ngInject */
        function ${nameComponent}ComponentController() {
            var $ctrl = this;
            $ctrl.$onInit = onInit;
            
            function onInit() {}
        }
    })();`;

    const testStructure = 
        `describe('Controller: ${nameComponent}', () => {
            application.initModule();
            var $ctrl,
                ${nameComponent}Controller,
                scope;
    
            beforeEach(inject((_$controller_, _$rootScope_) => {
                scope = _$rootScope_.$new();
                $ctrl = _$controller_;
                ${nameComponent}Controller = $ctrl('${nameComponent}Controller', { $scope: scope });
            }));
    
            it('${nameComponent}ComponentController should be defined', () => {
                expect(${nameComponent}ComponentController).toBeDefined();
            });
        });`

    fs.writeFileSync(`${nameComponent}/${nameComponent}.component.js`, componentStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
    fs.writeFileSync(`${nameComponent}/${nameComponent}.component.spec.js`, testStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
    fs.writeFileSync(`${nameComponent}/${nameComponent}.template.html`, '', (e) => console.log(e || 'Arquivo gerado com sucesso!'));
    fs.writeFileSync(`${nameComponent}/${nameComponent}.sass`, '', (e) => console.log(e || 'Arquivo gerado com sucesso!'));

    process.exit();
});



