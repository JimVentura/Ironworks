/*
* File: javaGenerator.js
* Version: 1.0
* Type: javascript
* Date: 2018-08-16
* Author: Leo Moz
* E-mail: JurassicSWE@gmail.com
*
* License: GNU General Public License v3.0
*
*/
'use strict';

module.exports = class JavaGenerator {

    constructor() {
      this.code = '';
      this.metodi = '';
    }

    generate(data) {
        if(data.length > 0) {

		  this.code += ('package ironworks;\n\n');
		  
		  this.code += ('import java.util.Date;\n');
		  this.code += ('import java.io.Serializable;\n');
		  this.code += ('import javax.persistence.*;\n\n');
		  /*
		  this.code += ('import javax.persistence.Column;\n');
		  this.code += ('import javax.persistence.Entity;\n');
		  this.code += ('import javax.persistence.GeneratedValue;\n');
		  this.code += ('import javax.persistence.Id;\n');
		  this.code += ('import javax.persistence.Table;\n\n');
		  */

          for (let i = 0; i < data.length; i++) {
              let entity = data[i];

              this.code += ('/*\n* Entità ' + entity.name + '\n*/\n');
              this.code += ('@Entity\n');
              this.code += ('class ' + entity.name + ' implements Serializable {');

			  let pk = false;
			  
              if(entity.attr.length > 0) {
                this.code += ('\n\n');

                for(let i = 0; i < entity.attr.length; i++) {
                    let attribute = entity.attr[i];
					if(attribute.primaryKey === 'true')
						pk = true;
                    this.newField(
                        attribute.scope,
                        attribute.array,
                        attribute.type,
                        attribute.name,
                        attribute.primaryKey,
                    );
                }

                this.code += ('\n' + this.metodi + '\n');
              }
			  if(entity.attr.length === 0)
				this.code += ('\n\n');
              if((entity.attr.length === 0) || (!pk)) {
                this.code += ('   @Id @GeneratedValue\n');
                this.code += ('   @Column(name = "id")\n');
                this.code += ('   private int id;\n');
                this.code += ('   private int getId() {return id;}\n');
                this.code += ('   private void setId(int auxid) {this.id=auxid;}\n\n');
              }
              this.code += ('}\n\n');
              this.metodi = '';
          }

          let aux = this.code;
          this.code = '';
          this.metodi = '';

          return aux;
        }
        else {
            return '';
        }
    }

    newField(scope, array, type, name, primaryKey) {
        if(array==='true'){
            type=type + '[]';
        }
        if(primaryKey === 'true'){
            this.code += ('   @Id\n');
        }
        this.code += ('   @Column(name = "' + name + '")\n');

        this.code += ('   ' + scope + ' ' + type + ' ' + name);
        /*if(array === 'true'){
          this.code += ('[];\n\n');
        }else{
          this.code += (';\n\n');
        }*/
        this.code += (';\n\n');
        this.metodi += ('   ' + type + ' get' + name.substring(0,1).toUpperCase() + name.substring(1) + '() {return ' + name + ';}\n');
        this.metodi += ('   void set' + name.substring(0,1).toUpperCase() + name.substring(1) + '(' + type + ' ' + name + ') {this.' + name + ' = ' + name + ';}\n\n');
    }

    generateMain(data) {

		  this.code += ('package ironworks;\n\n');
		  
		  this.code += ('import java.util.Date;\n\n');

          this.code += ('import org.hibernate.Session;\n');
          this.code += ('import org.hibernate.SessionFactory;\n');
          this.code += ('import org.hibernate.Transaction;\n');
          this.code += ('import org.hibernate.cfg.Configuration;\n\n');
		  
          this.code += ('public class StoreData {\n\tpublic static void main(String[] args) {\n');
          this.code += ('\n\t\tConfiguration cfg = new Configuration(); \n');
          this.code += ('\t\tcfg.configure("hibernate.cfg.xml");\n');
          this.code += ('\t\tSessionFactory factory = cfg.buildSessionFactory();\n');
          this.code += ('\t\tSession session = factory.openSession();\n');
          this.code += ('\t\tTransaction t = session.beginTransaction();\n\n');
		  
          this.code += ('\t\t//Inserire qui il codice per la manipolazione degli oggetti\n\n');
		  this.code += ('\t\t/*\n\t\t * Esempio:\n');
		  this.code += ('\t\t * MyEntity foo = new MyEntity();\n');
		  this.code += ('\t\t * foo.setAttr("bar");\n');
		  this.code += ('\t\t * session.save(foo);\n');
		  this.code += ('\t\t */\n\n');
		  
          this.code += ('\t\tt.commit();\n');
          this.code += ('\t\tfactory.close();\n');
          this.code += ('\t\tsession.close();\n\n');
          this.code += ('\t}\n');
          this.code += ('}\n');
          let aux = this.code;
          this.code = '';
          this.metodi = '';
          return aux;
    }

}
