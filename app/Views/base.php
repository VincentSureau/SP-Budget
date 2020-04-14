<html>
    <head>
        <title>
            <?= $this->e($myTitle) ?>
        </title>
        <link rel="apple-touch-icon" sizes="57x57" href="<?= $basePath ?>/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="<?= $basePath ?>/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="<?= $basePath ?>/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="<?= $basePath ?>/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="<?= $basePath ?>/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="<?= $basePath ?>/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="<?= $basePath ?>/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="<?= $basePath ?>/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="<?= $basePath ?>/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="<?= $basePath ?>/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="<?= $basePath ?>/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="<?= $basePath ?>/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="<?= $basePath ?>/favicon-16x16.png">
        <link rel="manifest" href="<?= $basePath ?>/manifest.json">
        <meta name="msapplication-TileColor" content="#e95354">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#e95354">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="<?= $basePath ?>/assets/app.css">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    </head>

    <body>
        <header> 
            <?= $this->insert('partials/_navbar'); ?>
        </header>
        <aside>
            <?= $this->insert('partials/_sidenav'); ?>
        </aside>
        <main>
            <?= $this->section('content'); ?>
            
        </main>

        <?= $this->insert('partials/_footer'); ?>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>
        <script src="<?= $basePath ?>/assets/runtime.js"></script>
        <script src="<?= $basePath ?>/assets/vendors~app.js"></script>
        <script src="<?= $basePath ?>/assets/app.js"></script>
        
        <?= $this->section('js'); ?>
        
    </body>
</html>