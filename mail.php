<?php
	$name = $_REQUEST["name"];
	$tel = $_REQUEST["tel"];
	$count = $_REQUEST["count"];
	$date = $_REQUEST["date"];
	$theme = 'Заявка на обратный звонок с сайта cybercity21.ru';
	$letter = '<html>
                <head>
                  <title></title>
                </head>
                <body>
                  <p>Данные пользователя:</p>
                  <span><b>Имя:</b> '.$name.'</span><br>
                  <span><b>Телефон:</b> '.$tel.'</span><br>
                  <span><b>Количество мест:</b> '.$count.'</span><br>
                  <span><b>Дата:</b> '.$date.'</span>
                </body>
              </html>';
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	mail('support@cybercity21.ru', $theme, $letter, $headers);