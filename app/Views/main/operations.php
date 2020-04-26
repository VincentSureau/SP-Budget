
<?= $this->layout('base', ['myTitle' => 'Accueil']); ?>

<!-- content -->
<div class="container">
    <div class="z-depth-4 card-rounded">
        <h1 class="center-align">Mes opérations</h1>
        <div class="row">
            <form class="col s12 l8 offset-l2 xl6 offset-xl3 mb-0" action="<?= $router->generate("main_operations") ?>">
                <input type="hidden" name="c" value="<?= $order['category'] ?>">
                <input type="hidden" name="a" value="<?= $order['amount'] ?>">
                <input type="hidden" name="d" value="<?= $order['date'] ?>">
                <div class="row mb-0">
                    <div class="input-field col s12 col m6">
                        <i class="material-icons prefix">date_range</i>
                        <input id="start" 
                            name="start" 
                            type="date" 
                            class="validate" 
                            value="<?= $startDate->format('Y-m-d')?>" 
                            onchange="this.form.submit();" 
                            required
                        >
                        <label for="start">Du</label>
                    </div>
                    <div class="input-field col s12 col m6">
                        <i class="material-icons prefix">date_range</i>
                        <input id="end" 
                            name="end" type="date" 
                            class="validate" 
                            value="<?= $endDate->format('Y-m-d')?>" 
                            onchange="this.form.submit();" 
                            required
                        >
                        <label for="end">Au</label>
                    </div>
                </div>
            </form>
        </div>

        <div class="row">

        <?php if(!empty($operations)): ?>
            <div class="col s12">
                <table class="striped highlight">
                    <thead>
                        <tr>
                            <th>
                                Catégorie
                                <a class="right grey-text <?= $order['category'] == 'DESC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?c=DESC&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_downward</i></a>
                                <a class="right grey-text <?= $order['category'] == 'ASC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?c=ASC&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_upward</i></a>
                            </th>
                            <th>
                                Date
                                <a class="right grey-text <?= $order['date'] == 'DESC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?d=DESC&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_downward</i></a>
                                <a class="right grey-text <?= $order['date'] == 'ASC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?d=ASC&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_upward</i></a>
                            </th>
                            <th>
                                <a class="right grey-text <?= $order['amount'] == 'DESC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?a=DESC&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_downward</i></a>
                                <a class="right grey-text <?= $order['amount'] == 'ASC' ? 'text-darken-2' : 'text-lighten-2' ?>" href="?a=ASC&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>"><i class="material-icons">arrow_upward</i></a>
                                Montant
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <?php foreach($operations as $operation): ?>
                        <tr>
                            <td><?= $operation->getCategory() ?></td>
                            <td class="center-align"><?= (\DateTime::createFromFormat('Y-m-d H:i:s',$operation->getDate()))->format('d/m/Y') ?></td>
                            <td class="right-align <?= $operation->getAmount() > 0 ? "green-text" : "red-text" ?>">
                                <?= $operation->getAmount() ?> &euro;
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan=2>Total</th>
                            <th class="right-align <?= $total > 0 ? "green-text" : "red-text" ?>">
                                <?= $total ?> &euro;
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="row center-align">
                <ul class="pagination">
                    <li class="<?= $currentPage == 1 ? "disabled" : "wave-effect" ?>">
                        <a href="?c=<?= $order['category'] ?>&a=<?= $order['amount'] ?>&d=<?= $order['date'] ?>&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>&p=<?= max(1, $currentPage - 1) ?>">
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                    <?php for($index = 1; $index <= $totalPage; $index++): ?>
                        <li class="<?= $currentPage == $index ? "active" : "waves-effect" ?>">
                            <a href="?c=<?= $order['category'] ?>&a=<?= $order['amount'] ?>&d=<?= $order['date'] ?>&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>&p=<?= $index ?>">
                                <?= $index ?>
                            </a>
                        </li>
                    <?php endfor;?>
                    <li class="<?= $currentPage == $totalPage ? "disabled" : "wave-effect" ?>">
                        <a href="?c=<?= $order['category'] ?>&a=<?= $order['amount'] ?>&d=<?= $order['date'] ?>&start=<?= $startDate->format('Y-m-d')?>&end=<?= $endDate->format('Y-m-d')?>&p=<?= min($totalPage, $currentPage + 1) ?>">
                            <i class="material-icons">chevron_right</i>
                        </a>
                    </li>
                </ul>
            </div>
        <?php elseif($startDate > $endDate): ?>
            <p class="center-align">Les dates indiquées ne sont pas valides</p>
        <?php else: ?>
            <p class="center-align">Il n'y a aucune opération sur la période demandée</p>
        <?php endif; ?>
        </div>
    </div>

</div>