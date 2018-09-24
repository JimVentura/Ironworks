/*
* File: sqlGenerator.js
* Version: 1.0
* Type: javascript
* Date: 2018-09-05
* Author: Marco Masiero
* E-mail: JurassicSWE@gmail.com
*
* License: GNU General Public License v3.0
*
*/

'use strict'

module.exports = class sqlGenerator {
  constructor() {
    this.code = '';
    this.array = '';
  }

  generate(data) {
      if(data.length > 0) {


        for (let i = 0; i < data.length; i++) {
            let entity = data[i];

            this.code += ('DROP TABLE IF EXISTS '+ entity.name +';\n');

            this.code += ('CREATE TABLE ' + entity.name + ' (\n');

            if(entity.attr.length > 0) {
              let pk = false;
              for(let i = 0; i < entity.attr.length; i++) {
                  let attribute = entity.attr[i];
                  if(attribute.array === 'true')
                    attribute.type= 'Array';
                  this.newField(
                      attribute.name,
                      attribute.type,
                      attribute.primaryKey,
                  );
                  if(attribute.primaryKey === 'true')
                    pk = true;
                  if( i !== entity.attr.length-1)
                      this.code += (',\n');
              }
              if(!pk){
				  this.code += (',\n');
				  this.code += ('id INT AUTO_INCREMENT PRIMARY KEY');
			  }
              this.code += ('\n');
            }
            else {
              this.code += ('id INT AUTO_INCREMENT PRIMARY KEY\n');
            }
            this.code += (') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n');
        }

        let aux = this.code;
        this.code = '';

        return aux;
      }
      else {
          return '';
      }
  }

  newField(name, type, primaryKey) {
      this.code += (name + ' ');
      if(type === 'String')
      this.code += ('VARCHAR(30)');
      if(type === 'Integer')
      this.code += ('INT(6)');
      if(type === 'Double')
      this.code += ('FLOAT(16)');
      if(type === 'Data')
      this.code += ('DATE');
      if(type === 'Boolean')
      this.code += ('BOOLEAN');
      if(type === 'Array')
      this.code += ('TEXT');
      if(primaryKey === 'true'){
          this.code += (' PRIMARY KEY');
      }
}


}
