<html>
    <head>
        <title>
            <?= $this->e($myTitle) ?>
        </title>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="<?= $basePath ?>/assets/css/style.css">
    </head>

    <body>
        <header> 
            <?= $this->insert('partials/_navbar'); ?>
        </header>

        <main>

            <?= $this->section('content'); ?>
            
        </main>

        <?= $this->insert('partials/_footer'); ?>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>
        <script src="<?= $basePath ?>/assets/js/app.js"></script>
        
        <?= $this->section('js'); ?>
        
    </body>
</html>