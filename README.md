**Этот проект реализует самобалансирующееся AVL-дерево на TypeScript, используя утилитарные типы (MyReadonly), которые обеспечивают иммутабельность узлов дерева.**

Файлы проекта
***1. utilityTypes.ts***
Этот файл содержит утилитарные типы (Utility Types), которые помогают работать с типами в TypeScript.

MyReadonly<T> — делает все свойства объекта T только для чтения.
MyPartial<T> — делает все свойства объекта T необязательными.
MyNonNullable<T> — убирает null и undefined из типа.
StringKeys<T> — возвращает ключи объекта T, значения которых являются строками.

***2. avlTree.ts***
Основной файл с реализацией AVL-дерева.

Класс Node<T> (узел дерева)
Этот класс представляет узел AVL-дерева, который иммутабельный (изменять его свойства нельзя).
Каждый узел содержит:

value: T — значение узла.
left: MyReadonly<Node<T>> | null — левый потомок (тоже readonly).
right: MyReadonly<Node<T>> | null — правый потомок.
height: number — высота узла.
Почему readonly?
Это гарантирует, что дерево остаётся неизменяемым — если нужно обновить узел, создаётся новая версия.

Класс AVLTree<T> (само дерево)
Этот класс управляет балансировкой и операциями с деревом.

Методы:
getHeight(node: MyReadonly<Node<T>> | null): number

Возвращает высоту узла (0, если узел null).
Используется для балансировки дерева.
getBalanceFactor(node: MyReadonly<Node<T>> | null): number

Вычисляет баланс-фактор узла (высота_левого - высота_правого).
Если баланс >1 или <-1, то нужно выполнять повороты.
rotateRight(y: MyReadonly<Node<T>>): MyReadonly<Node<T>>

Выполняет правый поворот узла y.
Новый корень — y.left, а y становится правым потомком нового корня.
Создаёт новый узел, не изменяя старый.
rotateLeft(x: MyReadonly<Node<T>>): MyReadonly<Node<T>>

Выполняет левый поворот узла x.
Новый корень — x.right, а x становится левым потомком нового корня.
Создаёт новый узел, не изменяя старый.
insert(node: MyReadonly<Node<T>> | null, value: T): MyReadonly<Node<T>>

Вставляет новое значение в дерево.
Создаёт новый узел, если node = null.
Рекурсивно идёт влево/вправо, создавая новые узлы вместо изменения старых.
После вставки проверяет баланс и выполняет повороты, если нужно.
add(value: T): void

Внешний метод для вставки.
Просто вызывает insert, начиная с корня root.
search(node: MyReadonly<Node<T>> | null, value: T): MyReadonly<Node<T>> | null

Поиск элемента в дереве.
Рекурсивно идёт влево/вправо, пока не найдёт нужное значение.
find(value: T): MyReadonly<Node<T>> | null

Внешний метод для поиска (обёртка над search).
***3. index.ts***
Этот файл использует AVLTree для создания дерева и выполнения операций.

