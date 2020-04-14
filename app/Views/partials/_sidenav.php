<ul id="slide-out" class="sidenav">
    <li class="red lighten-2 sidenav-header">
        <img src="<?= $basePath ?>/images/logo-banking.svg" alt="Logo" width="150">
    </li>
    <li><a href="<?= $router->generate("main_home") ?>"><i class="material-icons">bar_chart</i>Mon compte</a></li>
    <li><a href="<?= $router->generate("main_operations") ?>"><i class="material-icons left">view_list</i>Mes opérations</a></li>
    <li><a href="<?= $router->generate("operation_add") ?>"><i class="material-icons">add</i>Ajouter une opération</a></li>
    <?php if($isConnected): ?>
        <li><a href="<?= $router->generate("user_logout") ?>"><i class="material-icons">power_settings_new</i>Déconnexion</a></li>
    <?php endif; ?>
</ul>