import { AVLTree } from "./avlTree";

const tree = new AVLTree<number>();
tree.add(10);
tree.add(20);
tree.add(5);

console.log(tree.find(10)); // Выведет найденный узел
