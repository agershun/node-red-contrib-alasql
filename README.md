# ALASQL and ALA-FILE NODE-RED NODES

(c) 2016 Mathias Mattias Wolf, Andrey Gershun

## node-red-contrib-alasql

This package consists of two components for Node-RED wrapping [AlaSQL](https://github.com/agershun/alasql) for fast SQL based in-memory data processing for BI and ERP applications and import-export files into XLSX, XLS, and other data formats.

Especially useful when you have (many) different sources coming with data you want to join, filter and format.


## Install

Go to your Node-RED user directory and install `node-red-node-alasql`. Typically like:

```bash
cd ~/.node-red
npm install node-red-node-alasql
```



## How to use ALASQL node

* `SQL query` parameter must hold a valid SQL query

* The result will be returned in `msg.payload`

#### Returned values

Typically the returned payload will be an array of objects:  

```js
[{name:'foo', age: 86}, {name:'bar', age:64}]
```

To manipulate output format please consult the use of [`VALUE OF`](https://github.com/agershun/alasql/wiki/Value), [`MATRIX OF`](https://github.com/agershun/alasql/wiki/MATRIX), [`COLUMN OF`](https://github.com/agershun/alasql/wiki/COLUMN), [`ROW OF`](https://github.com/agershun/alasql/wiki/ROW), and [`RECORDSET OF`](https://github.com/agershun/alasql/wiki/RECORDSET).


#### Multiply queries

The `SQL query` can hold several SQL queries separated by `;`. The returned value will be an array with the result from each typically returned payload.


#### Binding parameters

The `msg.payload` will be passed as a binded parameter. You can refer to the value by having `$0` in your SQL. If `msg.payload` is an array the first value will be `$0`, the second `$1` and so forth. 




##  So - what can I do?

Execute SQL on your data and output the result. 

This includes `INSERT`, `UPDATE`, `DELETE`, `VIEW` indexes and multiple levels of `JOIN`, `GROUP BY`, `UNION`, `ROLLUP()`, `CUBE()`, `GROUPING SETS()`, `CROSS APPLY`, `OUTER APPLY`, `WITH SELECT`, and subqueries. See the wiki to [compare supported features with SQL standards](https://github.com/agershun/alasql/wiki/SQL%20keywords).

Please [consult the AlaSQL wiki](https://github.com/agershun/alasql/wiki/readme) to undertand the flexible nature of the library. 


## Ala-file - Import and Export files

You also can use `ala-file` component to perform import and export operations with files. The parameters include:

* `Name` - the name of the node
* `File name` - path to import or export file
* `Format` - select file format 
* `Colums` - specify `*` (star) for all columns or list them with comma like `one, two, three`. You also can use AlaSQL functions or even rename columns with `AS` operator (see the AlaSQL `SELECT` statement documentation)
* `Headers` - include first line headers

## Please note

As default the library works in-memory - so all data are lost when Node-RED is restarted. Please consult [the wiki](https://github.com/agershun/alasql/wiki) to read more about how to let data be persistent.  

If you are not sure why this is funny - please find out more about "SQL injections"...

![xkcd](https://cloud.githubusercontent.com/assets/1063454/13614823/999e9548-e572-11e5-9661-57a06e8f3fa4.png)



