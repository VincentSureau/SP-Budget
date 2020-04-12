<?= $this->layout('base', ['myTitle' => 'Connexion']); ?>

<!-- content -->
<div class="container">

    <div class="row">
        <div class="col s12 m10 offset-m1 l8 offset-l2">
            <h1 class="h3 mb-3 font-weight-normal center-align">Me connecter</h1>
            <?php if (!empty($errors)): ?>
                <div class="card-panel red lighten-4">
                    <?php foreach($errors as $error): ?>
                        <span class="red-text text-darken-4"><?= $error ?></span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <div class="card-panel z-depth-4 form">
                <div class="col-6 center-align">
                    <i class="material-icons large">lock_outline</i>
                </div>
                <form method="post">
                                        
                    <input type="email" value="vincentsureau5@gmail.com" name="email" id="inputEmail" class="validate" required>
                    <input type="password" name="password" id="inputPassword" class="" value="Boulon*2019" class="validate" required>
                   <div class="row center-align">
                        <button class="btn btn-large" type="submit">
                            Connexion
                        </button>
                   </div>
                </form>
                
            </div>
        </div>
    </div>
</div>