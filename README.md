
# Documentación Redes neuronales

Demo: https://bayrondavid.github.io/Inteligencia-artificial-3corte/ 

*Morales Vanegas Bayrón David*

*Gómez Luque Hector Julian*

*Gómez Jimenez Laura Stephanya*

*Ospina Salamanca Breidy Catalina*

*Docente:* 

*Córtes Rico Laura Juliana*

*Universidad Militar Nueva Granada*

1. **Descripción técnica**

Para el diseño de la aplicación web que permite el entrenamiento y clasificación del color de un texto que contraste bien sobre un fondo de cualquier color, se hizo uso de dos librerias que fueron jscolor.js y Brain.js que sirven para implementar los selectores de color y facilitar la comprensión de las redes neuronales, ya que simplifica los procesos matematicos a realizar.

1. **Arquitectura**

Para la realización de este laboratorio se usaron tecnologías de desarrollo web, HTML, JavaScript y CSS. 

Con el fin de brindar una mejor experiencia de usuario se usaron 3 librerías:

1. **JSColor**: Una libreria que brinda selectrores de color con mejores caracteristicas que el de HTML nativo y ademas permite lanzar eventos en tiempo real.

link: <https://jscolor.com/>

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.001.png)

1. **Organic Shape Animations with SVG clipPath:** Una código extraído de GitHub el cual brinda algunas animaciones en SVG y que se implementaron en la entrega final. 

link: <https://github.com/codrops/OrganicShapeAnimations.git>

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.002.png)

1. **math.js:** Es una extensa biblioteca matemática para JavaScript y Node.js. Cuenta con un analizador de expresiones flexible con soporte para cálculo simbólico, viene con un gran conjunto de funciones y constantes integradas, y ofrece una solución integrada para trabajar con diferentes tipos de datos como números, números grandes, números complejos, fracciones, unidades y arreglos Poderoso y fácil de usar.

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.003.png)

El entregable final tiene como objetivo, entrenar, visualizar el dataset y ejecutar una demostración en tiempo real con 3 modos de color, blamco y negro, escala de grises y RGB. 

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.004.png)

La red neuronal se programó en Javascript nativo, y gran parte del codigo estuvo basado en el siguiente articulo <https://towardsdatascience.com/creating-a-neural-network-from-scratch-302e8fb61703>, 

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.005.png)

**Descripción de las redes neuronales:**

La clase Neurona, permite crear redes neuronales instanciando en su constructor un arreglo con las capas necesarias.

En el siguiente ejemplo se crea una neurona con tres capas de entrada, 3 ocultas y 1 de salida.

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.006.png)

Para todos los casos se usó este tipo de red neuronal. 

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.007.png)

Se uso la funcion de activacion  sigmoid:

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.008.png)

con un ratio de entrenamiento de 0.01 y un total de 200 épocas para cada entrenamiento. 

1. **Blanco y negro:** 

Para este caso solo se usó una red neuronal, en donde los datos de entrada normalizados generaban un único dato de salida con un valor entre 0 y 1, por lo que se usó una función de escalonaje para que las salidas <0.5 = 0 y >0.5 =1. Posteriormente se multiplica dicho valor por 255, obteniendo así únicamente 0 o 255. 

1. **Escala de grises** 

Para este caso solo se usó una red neuronal, en donde los datos de entrada normalizados generaban un único dato de salida con un valor entre 0 y 1. Posteriormente se multiplica dicho valor por 255, obteniendo así un número que se repite en los tres canales, RGB para obtener una escala de grises. 

1. **RGB**

Para este caso se usaron 3 redes neuronales, una para cada canal de salida, es decir, por cada entrada rgb se obtiene una predicción de un color. Si por ejemplo la entrada es el color azul y la salida el amarillo se crean 3 redes neuronales, que se entrenan de la siguiente manera; para las tres los datos de entrada son los mismos pero los datos de salida, para la primera seria el canal rojo, para la segunda el verde y la trecera el azul.

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.009.png) 

De esta manera, el algoritmo podría hacer un pronóstico para cada canal. 



1. **Descripción detallada de los conjuntos de entrenamiento**

Para el entrenamiento de los modelos se crearon y probaron datasets que posteriormente se guardan archivos .json que se cargan al iniciar la aplicación, de igual manera el usuario podrá crear su propio dataset y probarlo en tiempo real. 

1. **Blanco y negro :** Los datos se almacenan en arreglos de cuatro dimensiones, en donde los 3 primiers valores son los de entrada y el ultimo de salida. 

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.010.png)

1. **Escala de grises:**  Los datos se almacenan en arreglos de cuatro dimensiones, en donde los 3 primeros valores son los de entrada y el último de salida. 

![](./Documentacion/Aspose.Words.63b675a9-b2c3-4864-8964-0708c85ebf9a.011.png)

1. **RGB:** los datos se almacenan en arreglos de 6 dimensiones, en donde los tres primeros valores son los de entrada y los últimos de salida. A este arreglo se le aplican una serie de operaciones para poder entrenar el modelo con la metodología ya descrita. 

1. **Resultados de clasificación según la etapa de entrenamiento**

1. **Conclusiones**

- Al finalizar el proyecto podemos concluir que se logró el objetivo principal, el cual era crear una aplicación web en la que se permita modificar el color del fondo y en la que el color del texto se cambie automáticamente para que los dos colores contrasten correctamente
- También se puede concluir que el diseño desarrollado se divide en tres secciones principales que son: la sección de entrenamiento, la sección de previsualización de los datos de entrenamiento en donde se ven los valores RGB tanto del color de fondo como del color del texto y finalmente la sección de prueba, donde se puede elegir un color de fondo y se cambiará el color del texto logrando un contraste adecuado
- Por otra parte es importante mencionar que como cada red neuronal tiene una única salida fue necesario implementar tres redes neuronales, ya que teníamos tres canales de entrada que son RGB pero también necesitábamos obtener los tres canales de salida y no solo uno.





