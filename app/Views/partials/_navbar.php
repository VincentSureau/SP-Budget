<div class="navbar-fixed">
    <nav>
        <div class="nav-wrapper">
            <a href="<?= $router->generate("main_home") ?>" class="brand-logo center">
                <img src="<?= $basePath ?>/images/logo-banking.svg" alt="Logo">
            </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <?php if($isConnected): ?>
                    <li><a href="<?= $router->generate("user_logout") ?>">Déconnexion</a></li>
                <?php endif; ?>
            </ul>
            <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                <i class="material-icons">menu</i>Menu
            </a>
        </div>
    </nav>
</div>