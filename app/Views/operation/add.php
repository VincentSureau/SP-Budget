
<?= $this->layout('base', ['myTitle' => 'Ajouter une opération']); ?>

<!-- content -->
<div class="container">
    <form class="z-depth-4 form" action="<?= $basePath ?>/ajouter-une-operation" method="POST">
        <div class="row">
            <h2 class="center-align">Ajouter une opération</h2>
        </div>
        <div class="row center-align">
            <label>
                <input name="type" value="expense" type="radio" />
                <span>Dépense</span>
            </label>
            <label>
                <input name="type" value="income" type="radio" />
                <span>Revenu</span>
            </label>
        </div>
        <div class="row">
            <div class="input-field col s12 l6">
                <input id="amount" name="amount" type="number" step="0.01" class="validate">
                <label for="amount">Montant</label>
            </div>
            <div class="input-field col s12 l6">
                <input type="date" id="date" name="date" class="validate">
                <label for="date" class="">Date</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12 l6">
                <select id="category" name="category" class="validate" required>
                    <option value="" disabled selected>Choisir une catégorie</option>
                    <?php foreach($categories as $category) : ?>
                        <option value="<?= $category->getId() ?>"><?= $category->getName() ?></option>
                    <?php endforeach; ?>
                </select>
                <label>Catégorie</label>
            </div>
            <div class="input-field col s12 l6">
                <select id="paymentMethod" name="paymentMethod" class="validate" required>
                    <option value="" disabled selected>Choisir un mode de paiement</option>
                    <?php foreach($paymentMethods as $paymentMethod) : ?>
                        <option value="<?= $paymentMethod->getId() ?>"><?= $paymentMethod->getName() ?></option>
                    <?php endforeach; ?>
                </select>
                <label>Mode de paiement</label>
            </div>
        </div>
        <div class="input-field col s12">
            <textarea id="comment" name="comment" class="materialize-textarea"></textarea>
            <label for="comment">Commentaire</label>
        </div>
        <div class="input-field col s12 right-align">
            <button class="btn waves-effect waves-light btn-large" type="submit" name="add" value="add">Ajouter
                <i class="material-icons right">add</i>
            </button>
        </div>
    </form>
</div>