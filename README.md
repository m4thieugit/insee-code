# insee-code
Récupération de code INSEE d'une region / commune / département

## Installation
Pour installer ce package, tapez la commande suivante : ```npm i insee-code```

## Documentation
#### Méthodes :
-  [getCommune(\<string>)](https://github.com/m4thieugit/insee-code/blob/main/lib/inseeCode.js#L23) - Permet d'obtenir le code INSEE d'une commune
-  [getDepartement(\<string>)](https://github.com/m4thieugit/insee-code/blob/main/lib/inseeCode.js#L39) - Permet d'obtenir le code INSEE d'un département
-  [getRegion(\<string>)](https://github.com/m4thieugit/insee-code/blob/main/lib/inseeCode.js#L55) - Permet d'obtenir le code INSEE d'une région


## Exemple d'utilisation

- Code :
    ```
    const inseeCode = require('insee-code');
    const searchInseeCode = new inseeCode();
    
    searchInseeCode.getCommune('Paris')
    .then((commune) => {
        console.log(commune.name); // Nom de la commune
        console.log(commune.code); // Code INSEE de la commune
        console.log(commune); // Voir ci-dessous
    })
    .catch(console.error);
    ```

- Sortie :
    ```
    [ { name: 'Paris', code: '75056' } ]
    ```
    
## Auteur
Module réalisé par *m4thieugit*.
- Github : [@m4thieugit](https://github.com/m4thieugit)
