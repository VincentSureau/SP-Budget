
<?= $this->layout('base', ['myTitle' => 'Ajouter une opération']); ?>

<!-- content -->
<div class="container">
    <form class="z-depth-4 card-rounded" action="<?= $router->generate("main_home") ?>ajouter-une-operation" method="POST">
        <div class="row">
            <h1 class="center-align">Ajouter une opération</h1>
        </div>
        <?php if(!empty($errors) && $isSubmitted): ?>
            <div class="card-panel red lighten-4">
                <?php foreach($errors as $error): ?>
                    <p class="red-text text-darken-4"><?= $error ?></p>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        <div class="row center-align">
            <label>
                <input name="operation_type" 
                    value="expense" 
                    type="radio" 
                    onchange="this.form.submit();"
                    <?= $operation_type == "expense" ? "checked" : "" ?>
                />
                <span>Dépense</span>
            </label>
            <label>
                <input name="operation_type"
                    value="income" 
                    type="radio" 
                    onchange="this.form.submit();"
                    <?= $operation_type == "income" ? "checked" : "" ?>
                />
                <span>Revenu</span>
            </label>
        </div>
        <div class="row">
            <div class="input-field col s12 l6">
                <input id="amount" name="amount" type="number" step="0.01" class="validate" value="<?= $operation->getAmount() ?? 0 ?>">
                <label for="amount">Montant</label>
            </div>
            <div class="input-field col s12 l6">
                <input type="date" id="date" name="date" class="validate" value="<?= $operation->getDate()->format("Y-m-d") ?>">
                <label for="date" class="">Date</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12 l6">
                <select id="category" name="category" class="validate" required>
                    <option value="" disabled selected>Choisir une catégorie</option>
                    <?php foreach($categories as $category) : ?>
                        <option value="<?= $category->getId() ?>" <?= ($operation->getCategoryId() == $category->getId()) ? "selected": "" ?> ><?= $category->getName() ?></option>
                    <?php endforeach; ?>
                </select>
                <label>Catégorie</label>
            </div>
            <div class="input-field col s12 l6">
                <select id="paymentMethod" name="paymentMethod" class="validate" required>
                    <option value="" disabled selected>Choisir un mode de paiement</option>
                    <?php foreach($paymentMethods as $paymentMethod) : ?>
                        <option value="<?= $paymentMethod->getId() ?>" <?= ($operation->getPaymentMethodId() == $paymentMethod->getId()) ? "selected": "" ?>><?= $paymentMethod->getName() ?></option>
                    <?php endforeach; ?>
                </select>
                <label>Mode de paiement</label>
            </div>
        </div>
        <div class="input-field col s12">
            <textarea id="comment" name="comment" class="materialize-textarea"><?= $operation->getComment() ?? "" ?></textarea>
            <label for="comment">Commentaire</label>
        </div>
        <div class="input-field col s12 right-align">
            <button class="btn waves-effect waves-light btn-large" type="submit" name="add" value="add">Ajouter
                <i class="material-icons right">add</i>
            </button>
        </div>
    </form>
</div>