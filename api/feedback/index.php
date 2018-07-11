<?
define("NO_KEEP_STATISTIC", true); // Не собираем стату по действиям AJAX
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

require_once(__DIR__ . '/../../bitrix/templates/tea_trail/dbg.php');

CModule::IncludeModule('iblock');
$СElement = new CIBlockElement;
$CEvent = new CEvent;

$request = json_decode(file_get_contents('php://input'), true);

$addedElement = $СElement->Add(
  Array(
    'IBLOCK_ID' => 7,
    'NAME' => $request['name'],
    'PREVIEW_TEXT' => $request['text'],
    'PROPERTY_VALUES' => Array(
      'EMAIL' => $request['email'],
      'PHONE' => $request['phone'],
    )
  )
);

if ($addedElement) {
  $CEvent->Send(
    'FEEDBACK_ADD',
    's1',
    Array(
      'NAME' => $request['name'],
      'EMAIL' => $request['email'],
      'PHONE' => $request['phone'],
      'TEXT' => $request['text'],
    )
  );

  echo json_encode(Array(
    'status' => 'ok',
  ));
} else {
  echo json_encode(Array(
    'status' => 'error',
  ));
}
