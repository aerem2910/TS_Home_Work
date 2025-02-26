"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const avlTree_1 = require("./avlTree");
const tree = new avlTree_1.AVLTree();
tree.add(10);
tree.add(20);
tree.add(5);
console.log(tree.find(10)); // Выведет найденный узел
