<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/print_eken.css?=time()">
    <title>Print eKenderaan Form</title>
</head>
<body>
    <main>
        <section class="title">
            <div class="wrapper-img">
                <img src="../img/Logo_Kementerian_Pendidikan_Tinggi_Malaysia.svg.png" alt="Logo Kementerian Pendidikan Tinggi ">
                <img src="../img/Logo KKSB.png" alt="Logo KKSB">
            </div>
            <!-- <br> -->
            <b>BORANG PERMOHONAN PENGGUNAAN KENDERAAN RASMI JABATAN</b>
        </section>

        <section class="user">
            <b>A. BUTIR-BUTIR PENGGUNA</b>
            <br>
            <div class="wrapper-partition">
                <div class="fill-name">
                    1. Nama Pemohon:
                </div>
                <div class="partition underline" id="name">
                    Mohammad Harith Affendi Bin Mohammad Zaini
                </div>
            </div>
            <div class="wrapper-partition">
                <div class="fill-name">
                    2. Bilangan penumpang (termasuk pemohon): 
                </div>
                <div class="sub-name">
                    i. Staf:
                </div>
                <div class="partition underline" id="numStaff">
                    4
                </div>
                <div class="sub-name">
                    ii. Pelajar:
                </div>
                <div class="partition underline" id="numStudent">
                    0
                </div>
            </div>
            <div class="wrapper-partition">
                <div class="fill-name">
                    3. Tujuan:
                </div>
                <div class="partition underline" id="purpose">
                    Pesta Buku
                </div>
            </div>
            <div class="wrapper-partition">
                <div class="fill-name">
                    4. Destinasi: 
                </div>
                <div class="partition underline" id="destination">
                    Shah Alam
                </div>
            </div>
            5. Jenis kenderaan:
            <br>
            <div class="req-vehicle">
                <div class="vehicle">
                    <input type="checkbox"> Aruz (VLR 4711)
                </div>
                <div class="vehicle">
                    <input type="checkbox"> Fortuner (BJG 2783)
                </div>
                <div class="vehicle">
                    <input type="checkbox"> Van (WSC 5483)  
                </div>
                <div class="vehicle">
                    <input type="checkbox"> Bas (WKK 6769)
                </div>
            </div>
            <table>
                <tr>
                    <td><b>Perjalanan</b></td>
                    <td><b>Tarikh</b></td>
                    <td><b>Masa</b></td>
                </tr>
                <tr>
                    <td>Pergi</td>
                    <td id="depDate"></td>
                    <td id="depTime"></td>
                </tr>
                <tr>
                    <td>Balik</td>
                    <td id="retDate"></td>
                    <td id="retTime"></td>
                </tr>
                <tr>
                    <td>Waktu mula</td>
                    <td id="staDate"></td>
                    <td id="staTime"></td>
                </tr>
            </table>
            <br>
            Tandatangan: ...........................................................
            <br>
            Tarikh: ......................................................................
        </section>

        <section class="office">
            <b>B. KEGUNAAN PEJABAT [Penyelaras Kendaraan]</b>
            <br>
            <div class="selection">
                <div class="partition"><input type="checkbox" id="available" onclick="return false">Ada kenderaan</div>
                <div class="partition"><input type="checkbox" id="unavailable" onclick="return false"> Tiada kenderaan</div>
            </div>
            <br><br>
            <div class="wrapper-partition">
                <div class="partition">
                    Nama Pemandu:
                    <div class="driver-list">
                        <div class="driver">- Driver's name</div>
                    </div>
                </div>

                <div class="partition">
                    Kenderaan dicadangkan untuk diguna:
                    <div class="rec-vehicle">
                        <div class="vehicle">
                            <input type="checkbox"> Aruz (VLR 4711)
                        </div>
                        <div class="vehicle">
                            <input type="checkbox"> Fortuner (BJG 2783)
                        </div>
                        <div class="vehicle">
                            <input type="checkbox"> Van (WSC 5483)  
                        </div>
                        <div class="vehicle">
                            <input type="checkbox"> Bas (WKK 6769)
                        </div>
                    </div>
                </div>
            </div>
            <br><br>
            lain-lain tugas: 
            <div class="other-task">
                <div class="task"><input type="checkbox">Tunggu hingga selesai tugas</div>
                <div class="task"><input type="checkbox">Tidak perlu tunggu</div>
                <div class="task"><input type="checkbox">Ambil semula pegawai pada:</div>
            </div>
            <div class="timedate">
                Masa: .......................................................................
                <br>
                Tarikh: ......................................................................
            </div>

            <br><br>
            Tandatangan: ...........................................................
            <br>
            Tarikh: ......................................................................
        </section>

        <section class="support">
            <b>C. MELALUI PENOLONG PEGAWAI TADBIR/PEGAWAI KENDERAAN</b>
            <div class="selection">
                <div class="partition">Pemohonan ini:</div>
                <div class="partition"><input type="checkbox" onclick="return false">Disokong</div>
                <div class="partition"><input type="checkbox" onclick="return false"> Tiada disokong</div>
            </div>

            <br><br>
            Tandatangan: ...........................................................
            <br>
            Tarikh: ......................................................................
        </section>

        <section class="director">
            <b>D. KELULUSAN PENGARAH</b>
            <div class="selection">
                <div class="partition">Pemohonan ini:</div>
                <div class="partition"><input type="checkbox" onclick="return false">Diluluskan</div>
                <div class="partition"><input type="checkbox" onclick="return false"> Tiada diluluskan</div>
            </div>

            <br><br>
            Tandatangan Pengarah: ..........................................
            <br>
            Tarikh: ......................................................................
        </section>

        <div class="note">
            <p>Apabila borang ini perlu ditandatanagan, pastikan borang ini tidak dibuka menggunakan Microsoft Word supaya format borang ini tidak rosak, selepas tuan/puan sudah simpan fail borang ini.</p>
        </div>
        <button type="button" id="print">Cetak</button>
    </main>

    <script src="../JS/print_eken.js?=1+time()"></script>
</body>
</html>