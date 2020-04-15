# SP-Budget

## Installation
+ Cloner le projet
+ Installer les dépendances PHP avec `composer install`
+ Installer WebPack-Encore avec `Yarn`
+ Compilier le SCSS et le Javascript avec `Yarn encore dev --watch` ou `yarn encore prod`
+ Copier le fichier `config.dist.ini` en `config.ini` et mettre à jour les variables d'environnement

## Routing
+ Le routing est géré avec [AltoRouter](https://github.com/dannyvankooten/AltoRouter)
+ Pour ajouter une route aller dans app/Application.php fonction `function defineRoutes`
+ Une route est construite en ajoutant une ligne du type: `$this->router->map('[HTTP_METHOD]', '/[SLUG]', '[CONTROLLER_NAME]#[METHOD]', '[ROUTE_NAME]');
+ HTTP_METHOD = 'GET|POST|PUT|DELETE'
+ ROUTE_NAME est facultatif mais permet de générer des routes dynamiquement

## Templating
+ Le moteur de template est [league/plates](https://github.com/thephpleague/plates)
+ Les vues sont situées dans le dossier app/Views

## CSS / Javascript
+ Le CSS et le Javascript sont compilés avec [Symfony\Webpack-Encore](https://symfony.com/doc/current/frontend.html)
+ Pour ajouter un entrée Javascript / CSS, ajouter une ligne du type `.addEntry('app', './assets/js/app.js')` dans le fichier `webpack.config.json`
+ Les assets sont compilés dans /puclic/assets
+ Le fichier .htaccess redirige toutes les requêtes sur /public/index.php, les fichiers accessibles depuis l'extérieur doivent se trouver obligatoirement dans le dossier public

## Debug 
+ La librairie [Symfony/VarDuper](https://symfony.com/doc/current/components/var_dumper.html) est installer pour faciliter le debug
+ Les fonction `dump($variable)` et `dd($variables)` (raccourci pour dump(); and die();) sont accessible depuis tous les fichiers de l'application