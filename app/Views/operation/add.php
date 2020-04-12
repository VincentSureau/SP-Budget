
<?= $this->layout('base', ['myTitle' => 'Accueil']); ?>

<!-- content -->
<div class="container">
    <form action="<?= $basePath ?>/ajouter-une-operation">
        <div class="input-field col s12">
            <select>
            <option value="" disabled selected>Choisir une catégorie</option>
            <?php foreach($categories as $category) : ?>
                <option value="<?= $category->getId() ?>"><?= $category->getName() ?></option>
            <?php endforeach; ?>
            </select>
            <label>Catégorie</label>
        </div>
        <div class="input-field col s12">
            <select>
            <option value="" disabled selected>Choisir un mode de paiement</option>
            <?php foreach($paymentMethods as $paymentMethods) : ?>
                <option value="<?= $paymentMethods->getId() ?>"><?= $paymentMethods->getName() ?></option>
            <?php endforeach; ?>
            </select>
            <label>Mode de paiement</label>
        </div>

    </form>
</div>