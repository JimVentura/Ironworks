/*
* File: xmlGenerator.js
* Version: 1.0
* Type: javascript
* Date: 2018-09-06
* Author: Leo Moz
* E-mail: JurassicSWE@gmail.com
*
* License: GNU General Public License v3.0
*
*/

'use strict';

module.exports = class XMLGenerator {

    constructor() {
        this.code = '';
    }

    generateConfig(data) {

        this.code += ('<?xml version = "1.0" encoding = "UTF-8"?>\n');
         //this.code += ('<!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD 3.0//EN" "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">\n\n');
        this.code += ('<!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD 5.3//EN" "http://hibernate.sourceforge.net/hibernate-configuration-5.3.dtd">\n\n');
        this.code += ('<hibernate-configuration>\n');
        this.code += ('   <session-factory>\n\n');

		//this.code += ('      <property name="hibernate.hbm2ddl.auto">\n');
		//this.code += ('          update');
		//this.code += ('\n      </property>\n\n');
		
        this.code += ('      <property name="hibernate.dialect">\n');
        this.code += ('          org.hibernate.dialect.MySQLDialect');
        this.code += ('\n      </property>\n\n');

        this.code += ('      <property name="hibernate.connection.driver_class">\n');
        this.code += ('          com.mysql.cj.jdbc.Driver'); //com.mysql.jdbc.Driver
        this.code += ('\n      </property>\n\n');

        this.code += ('      <property name="hibernate.connection.url">\n');
        this.code += ('          jdbc:mysql://url-db');
							/* esempio jdbc:mysql://localhost:3306/ironworks_db
							 * in caso di lamentele da parte di hibernate con l'orario del server, aggiungere in coda all'url:
							 * ?autoReconnect=true&amp;useSSL=false&amp;useLegacyDatetimeCode=false&amp;serverTimezone=UTC
							 */
        this.code += ('\n      </property>\n\n');

        this.code += ('      <property name="hibernate.connection.username">\n');
        this.code += ('          db-user');
        this.code += ('\n      </property>\n\n');

        this.code += ('      <property name="hibernate.connection.password">\n');
        this.code += ('          db-password');
        this.code += ('\n      </property>\n\n');

        this.code += ('      <mapping resource="diagram.hbm.xml"/>\n\n')

        this.code += ('   </session-factory>\n');
        this.code += ('</hibernate-configuration>\n');


        let aux = this.code;
        this.code = '';
        return aux;

    }

    generateCode(data) {

        this.code += ('<?xml version = "1.0" encoding = "UTF-8"?>\n');
        this.code += ('<!DOCTYPE hibernate-mapping PUBLIC "-//Hibernate/Hibernate Mapping DTD 5.3//EN" "http://hibernate.sourceforge.net/hibernate-mapping-5.3.dtd">\n\n');

        this.code += ('<hibernate-mapping>\n\n');
          for (let i = 0; i < data.length; i++) {
              let entity = data[i];
              this.code += ('<class name="ironworks.');
			  this.code += entity.name;
			  this.code += ('" table="');
              this.code += entity.name;
              this.code += ('">\n');
              let pk=false;
              let attrs=entity.attr;
              if(attrs.length > 0) {
				let codeaux='';
                for(let i = 0; i < attrs.length; i++) {
                  let attribute=attrs[i];
                  if(attribute.primaryKey=='true'){
                    pk=true;
                    this.code += ('\t<id name="');
                    this.code += attribute.name;
                    this.code += ('"></id>\n');
                  }else{
                    codeaux += ('\t<property name="');
                    codeaux += attribute.name;
                    codeaux += ('"></property>\n');
                  }
                }				
                if(!pk)
                  this.code += ('\t<id name="id">\n\t\t<generator class="assigned"></generator>\n\t</id>\n');
			    this.code += codeaux;
				codeaux = '';
              }else{
					this.code += ('\t<id name="id">\n\t\t<generator class="assigned"></generator>\n\t</id>\n');
			  }
              this.code += ('</class>\n\n');
          }
          this.code += ('</hibernate-mapping>');
          let aux = this.code;
          this.code = '';
          return aux;
    }

}
