<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

require_once(__DIR__ . '/dbg.php');
require_once(__DIR__ . '/goods_list.php');

CModule::IncludeModule('iblock');

$allGoodsSections = Array();
$teaSections = Array();
$dishesSection = Array();

$goodsSectionDbList = CIBlockSection::GetList(
  Array('SORT' => 'ASC'),
  Array('IBLOCK_ID' => 5)
);

while($ar_result = $goodsSectionDbList->GetNext()) {
  $allGoodsSections[$ar_result['ID']] = $ar_result;
  $sectionCode = $ar_result['CODE'];
  $ar_result['GOODS'] = Array();

  if ($sectionCode == 'dishes') {
    $dishesSection = $ar_result;
  } else {
    $ar_result['PICTURE'] = CFile::GetPath($ar_result['PICTURE']);
    $teaSections[$sectionCode] = $ar_result;
  }
}

$goodsDbList = CIBlockElement::GetList(
  Array('SORT' => 'ASC'),
  Array('IBLOCK_ID' => 5),
  false,
  false,
  Array(
    'ID',
    'IBLOCK_ID',
    'NAME',
    'CODE',
    'IBLOCK_SECTION_ID',
    'PROPERTY_PRICE',
    'PROPERTY_PRICE_POINT',
    'DETAIL_PICTURE',
    'PREVIEW_TEXT',
    'DETAIL_TEXT'
  )
);

while($ar_result = $goodsDbList->GetNext()) {
  $ar_result['DETAIL_PICTURE'] = CFile::GetPath($ar_result['DETAIL_PICTURE']);
  $ar_result['SECTION_CODE'] = $allGoodsSections[$ar_result['IBLOCK_SECTION_ID']]['CODE'];
  if ($ar_result['SECTION_CODE'] == 'dishes') {
    $dishesSection['GOODS'][$ar_result['CODE']] = $ar_result;
  } else {
    $teaSections[$ar_result['SECTION_CODE']]['GOODS'][$ar_result['CODE']] = $ar_result;
  }
}

$articles = Array();

$articlesDbList = CIBlockElement::GetList(
  Array('SORT' => 'ASC'),
  Array('IBLOCK_ID' => 8),
  false,
  false,
  Array(
    'ID',
    'IBLOCK_ID',
    'NAME',
    'CODE',
    'PROPERTY_VIDEO_CODE',
    'DETAIL_TEXT'
  )
);

while($ar_result = $articlesDbList->GetNext()) {
  $articles[$ar_result['CODE']] = $ar_result;
}

?>
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?$APPLICATION->ShowTitle()?></title>

    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <link rel="stylesheet" href="<?= SITE_TEMPLATE_PATH?>/style.css?v=<?= time()?>">

    <?$APPLICATION->ShowHead();?>
  </head>

  <body>
    <div id="panel"><?$APPLICATION->ShowPanel();?></div>

    <div class="page-wrapper js-page-wrapper">
      <div class="page">
        <div class="sidebar page__sidebar">
          <div class="board-phone sidebar__board">
            <div class="tel">+7 (385) 61-86-22</div>
            <div class="tel">+7 (385) 61-86-22</div>
          </div>

          <a href="#" class="logo sidebar__logo"></a>

          <div class="menu sidebar__menu">
            <div class="menu__items">
              <div class="menu__main">
                <?foreach($teaSections as $section):?>
                  <div class="menu__item">
                    <a href="#tea/<?= $section['CODE']?>" class="menu__link"><?= $section['NAME']?></a>
                  </div>
                <?endforeach;?>

                <div class="menu__item">
                  <a href="#<?= $dishesSection['CODE']?>" class="menu__link"><?= $dishesSection['NAME']?></a>
                </div>
              </div>

              <div class="menu__sub">
                <div class="menu__item">
                  <a href="#articles" class="menu__link">Интересное о чае</a>
                </div>

                <div class="menu__item">
                  <a href="#feedback" class="menu__link">Задать вопрос</a>
                </div>

                <div class="menu__item">
                  <a href="#about" class="menu__link">О нас</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="map page__map">
          <div class="map__img">
            <div class="map__pointer"></div>
          </div>
        </div>

        <div class="page__casual-dishes">
          <div class="casual-dishes">
            <div class="casual-dishes__static">
              <a href="#dishes">
                <div class="casual-dishes__goods"></div>
              </a>
            </div>
          <div class="casual-dishes__move"></div>
          </div>
        </div>

        <a href="#basket" class="kettle-small page__kettle-small">
          <div class="kettle-small__head"></div>
          <div class="kettle-small__tea"></div>
          <div class="kettle-small__cost-wrap">
            <div class="kettle-small__cost">0</div>
            <div class="kettle-small__cost-caption">руб.</div>
          </div>
        </a>

        <div class="about page__about" data-id="about">
          <div class="about__title">О нас</div>
          <div class="about__contacts">
            <div class="tel tel_lighter">+7 (385) 61-86-22</div>
            <div class="tel tel_lighter">+7 (385) 61-86-22</div>
            <div class="about__social">vk tea-trail.ru</div>
            <div class="about__skype">skype_tea-trail1</div>
          </div>
          <div class="about__text">
            Текст о нас и всём таком) Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
            magna aliqua.xercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>

        <div class="articles page__articles" data-id="articles">
          <div class="articles__title">Статьи</div>

          <div class="articles__items">
            <?
            $articlesPageSize = 5;
            $articlesPagesCount = ceil(count($articles) / $articlesPageSize);
            $itemNumber = 0;
            ?>

            <?foreach($articles as $article):?>
              <?if ($itemNumber % $articlesPageSize == 0):?>
                <div class="articles-page<?if ($itemNumber == 0):?> articles-page_active<?endif;?>">
              <?endif;?>
              <div class="articles__item">
                <?
                  if ($article['PROPERTY_VIDEO_CODE_VALUE']) {
                    $link = 'video/' . $article['CODE'];
                    $articleClassName = 'js-video-link';
                    $attrs = 'data-video-code="' . $article['PROPERTY_VIDEO_CODE_VALUE'] . '"';
                  } else {
                    $link = 'article/' . $article['CODE'];
                    $articleClassName = 'js-article-link';
                    $attrs = 'data-id="' . $article['ID'] . '"';
                  }
                ?>
                <a href="#<?= $link?>" class="articles__link <?= $articleClassName?>" <?= $attrs?>><?= $article['NAME']?></a>
              </div>

              <?$itemNumber++;?>

              <?if ($itemNumber % $articlesPageSize == 0 || ($itemNumber + 1) > count($articles)):?>
                </div>
              <?endif;?>
            <?endforeach;?>

            <div class="article-text-list">
              <?foreach($articles as $article):?>
                <?if (!$article['PROPERTY_VIDEO_CODE_VALUE']):?><div data-id="article-text-<?= $article['ID']?>"><?= $article['DETAIL_TEXT']?></div><?endif;?>
              <?endforeach;?>
            </div>
          </div>

          <?if (count($articles) > $articlesPageSize):?>
            <div class="switch-article articles__switch">
              <div class="switch-article__toggle switch-article__toggle_left"></div>

              <?for($page = 0; $page < $articlesPagesCount; $page++):?>
                <div class="switch-article__circle<?if ($page == 0):?> switch-article__circle_active<?endif;?>"></div>
              <?endfor;?>

              <div class="switch-article__toggle switch-article__toggle_right"></div>
            </div>
          <?endif;?>
        </div>

        <div class="paper page__paper js-article" data-id="article" style="display: none;">
          <div class="paper__title"></div>

          <div class="paper__text-wrapper js-paper">
            <div class="paper__text"></div>

            <div class="scroll paper__scroll">
              <div class="scroll__triangle-top"></div>
              <div class="scroll__line">
                <div class="scroll__handler js-paper-text-v-scroller-bar"></div>
              </div>
              <div class="scroll__triangle-bottom"></div>
            </div>
          </div>

          <div class="paper__link-articles">
            <a href="#articles" class="link-articles">все статьи и видео ></a>
          </div>
        </div>

        <form class="form page__form js-feedback-form" data-id="feedback">
          <div class="form__title">Задать вопрос</div>

          <input name="name" type="text" class="form__field" placeholder="Имя" required/>

          <input name="email" type="email" class="form__field" placeholder="Email" required/>

          <input name="phone" type="tel" class="form__field" placeholder="Телефон" required/>

          <div class="form__message-wrap">
            <textarea name="text" id="" class="form__message" placeholder="Введите текст сообщения..."></textarea>
          </div>

          <button type="submit" class="form__btn">Отправить</button>
        </form>

        <?if (count($dishesSection['GOODS']) > 0):?>
          <div class="dishes page__dishes" data-id="dishes">
            <div class="dishes__title">Чайная атрибутика</div>

            <div>
              <?goods_list($dishesSection);?>
            </div>
          </div>
        <?endif;?>

        <div class="kettle page__kettle" data-id="kettle">
          <div class="kettle__nose-smoke"></div>

          <div class="kettle__head kettle__head_opened"></div>

          <div class="kettle__inside">
            <div class="kettle__smoke-inside"></div>
          </div>

          <div class="kettle__mask">
            <div class="kettle__slider kettle-slider js-kettle-slider">
              <div class="kettle__slider-left"></div>

              <div class="kettle-slider__slides">
                <?$activeSlide = true;?>
                <?foreach ($teaSections as $section):?>
                  <div class="kettle-slider__slide<?if ($activeSlide):?> kettle-slider__slide_active<?endif;?>">
                    <div class="kettle-slider__image" style="background-image: url(<?= $section['PICTURE']?>)"></div>
                    <a href="#tea/<?= $section['CODE']?>" class="kettle__slider-title"><?= $section['NAME']?></a>
                  </div>
                  <?$activeSlide = false;?>
                <?endforeach;?>
              </div>

              <div class="kettle__slider-right"></div>
            </div>
          </div>
        </div>

        <div class="tea-goods page__tea" data-id="tea">
          <?foreach($teaSections as $section):?>
            <div class="tea-section" data-tea-section="<?= $section['CODE']?>">
              <?goods_list($section);?>
            </div>
          <?endforeach;?>
        </div>

        <div class="video page__video js-video" data-id="video" style="display: none;">
          <div class="video__title">Баста как заваривать чай</div>
          <div class="video__window">
            <iframe width="385" height="230" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="video__link-articles">
            <a href="#articles" class="link-articles link-articles_darker">< все статьи и видео</a>
          </div>
        </div>
      </div>

      <div class="scroller-bar scroller-bar_type_v js-v-scroller-bar"></div>

      <div class="scroller-bar scroller-bar_type_h js-h-scroller-bar"></div>
    </div>

    <div class="dialog-overlay">
      <div class="dialog dialog_for_basket js-dialog-basket">
        <div class="dialog__close"></div>

        <div class="scroll dialog__scroll scroll_for_dialog">
          <div class="scroll__triangle-top"></div>
          <div class="scroll__line scroll__line_bright">
            <div class="scroll__handler js-dialog-v-scroller-bar"></div>
          </div>
          <div class="scroll__triangle-bottom"></div>
        </div>

        <div class="dialog__content-wrapper">
          <div class="dialog__content js-dialog-content">
            <form class="basket js-order-form">
              <div class="title title_for_basket">Корзина</div>

              <div class="basket__order"></div>

              <div class="basket__total">Итого: <span class="js-basket-total"></span> р.</div>

              <div class="basket__delivery">
                <div class="delivery">
                  <div class="delivery__option">
                    <input checked type="radio" class="delivery__radio" name="delivery" id="delivery-one" value="Почта России">
                    <label for="delivery-one">
                      <div class="delivery__title">Доставка почтой России</div>
                    </label>
                  </div>
                  <div class="delivery__subtitle">стоймость доставки в любую точку России 300 р.</div>
                  <div class="delivery__subtitle">заказ от 5000 р доставка бесплатная</div>
                </div>

                <div class="delivery">
                  <div class="delivery__option">
                    <input type="radio" class="delivery__radio" name="delivery" id="delivery-two" value="По городу Рубцовску">
                    <label for="delivery-two">
                      <div class="delivery__title">Доставка по городу Рубцовску</div>
                    </label>
                  </div>
                  <div class="delivery__subtitle">Бесплатно</div>
                </div>
                <div class="delivery">
                  <div class="delivery__option">
                    <input type="radio" class="delivery__radio" name="delivery" id="delivery-three" value="Транспортной компанией">
                    <label for="delivery-three">
                      <div class="delivery__title">Доставка в любую точку страны удобной для вас транспортной компанией</div>
                    </label>
                  </div>
                  <div class="delivery__subtitle">Энергия, ПЭК, Слон, СДЭК, КИТ, EMS</div>
                  <div class="delivery__subtitle">Стоимость доставки зависит от пункта назначения</div>
                </div>
              </div>

              <div class="basket__form">
                <div class="basket-form">
                  <div class="basket-form__title">Адрес получателя</div>

                  <div class="basket-form__caption">ФИО</div>
                  <input name="fio" type="text" class="basket-form__field" required autocomplete="on">

                  <div class="basket-form__caption">Email</div>
                  <input name="email" type="email" class="basket-form__field" required autocomplete="on">

                  <div class="basket-form__caption">Телефон</div>
                  <input name="phone" type="tel" class="basket-form__field" required autocomplete="on">

                  <div class="basket-form__caption">Область, край, республика</div>
                  <input name="region" type="text" class="basket-form__field" required autocomplete="on">

                  <div class="basket-form__caption">Населенный пункт</div>
                  <input name="city" type="text" class="basket-form__field" required autocomplete="on">

                  <div class="basket-form__caption">Индекс</div>
                  <input name="index" type="text" class="basket-form__field" required autocomplete="on">

                  <div class="basket-form__caption">Адрес</div>
                  <input name="address" type="text" class="basket-form__field" required autocomplete="on">
                </div>

                <button type="submit" class="basket-form__btn">Оформить заказ</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="dialog js-dialog-goods" id="goods-dialog">
        <div class="dialog__close"></div>

        <div class="scroll dialog__scroll scroll_for_dialog">
          <div class="scroll__triangle-top"></div>
          <div class="scroll__line scroll__line_bright">
            <div class="scroll__handler js-dialog-v-scroller-bar"></div>
          </div>
          <div class="scroll__triangle-bottom"></div>
        </div>

        <div class="dialog__content-wrapper">
          <div class="dialog__content js-dialog-content">
            <div class="goods-card">
              <div class="goods-card__header">
                <div class="goods-card__img"></div>
                <div class="goods-card__right-section">
                  <div class="title goods-card__title"></div>
                  <div class="goods-card__cost"></div>
                  <div class="goods-card__short"></div>
                  <div class="btn goods-card__btn js-basket-button">
                    <div class="btn__section-left">
                      <div class="btn__calculate js-button-dec">-</div>
                      <div class="btn__quantity"></div>
                      <div class="btn__calculate js-button-inc">+</div>
                    </div>
                    <div class="btn__text">в корзину</div>
                  </div>
                </div>
              </div>
              <div class="js-tabs">
                <div class="goods-card__comments js-tabs-head">
                  <div class="goods-card__comments-tab goods-card__comments-tab_active">Описание</div>
                  <div class="goods-card__comments-tab">Вконтакте</div>
                </div>
                <div class="goods-card__content js-tabs-content">
                  <div class="goods-card__detail-text"></div>

                  <div class="goods-card__comments"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dialog dialog_for_order-finish js-dialog-order-finish">
        <div class="dialog__close"></div>

        <div class="title">
          Заказ успешно оформлен. Мы свяжемся с вами в ближайшее время.
        </div>
      </div>

      <div class="dialog dialog_for_feedback-finish js-dialog-feedback-finish">
        <div class="dialog__close"></div>

        <div class="title">
          Спасибо за обращение. Мы свяжемся с вами по телефону или email.
        </div>
      </div>
    </div>

    <script src="<?= SITE_TEMPLATE_PATH?>/main.js?v=<?= time()?>"></script>
  </body>
</html>
