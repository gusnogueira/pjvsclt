import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vlrClt: 1000,
      vlrPj: 1000,
      modalVisible: false,
    };
    this.abrirModal = this.abrirModal.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
  }

  abrirModal() {
    let s = this.state;
    s.modalVisible = true;
    this.setState(s);
  }

  fecharModal() {
    let s = this.state;
    s.modalVisible = false;
    this.setState(s);
  }

  render() {
    var remuneracaoClt = this.state.vlrClt;
    var fgts = remuneracaoClt * 0.08;
    var decTerc = remuneracaoClt / 12;
    var ferias = remuneracaoClt / 12 + remuneracaoClt / 12 / 3;
    var alqInss =
      remuneracaoClt <= 1100
        ? 7.5
        : remuneracaoClt >= 1100.01 && remuneracaoClt <= 2203.48
        ? 9
        : remuneracaoClt >= 2203.49 && remuneracaoClt <= 3305.22
        ? 12
        : remuneracaoClt >= 3305.23 && remuneracaoClt <= 6433.57
        ? 14
        : 'teto';
    var dedInss =
      remuneracaoClt <= 1100
        ? 0
        : remuneracaoClt >= 1100.01 && remuneracaoClt <= 2203.48
        ? 16.5
        : remuneracaoClt >= 2203.49 && remuneracaoClt <= 3305.22
        ? 82.6
        : remuneracaoClt >= 3305.23 && remuneracaoClt <= 6433.57
        ? 148.71
        : 'teto';
    var vlrInss =
      remuneracaoClt > 6433.57
        ? 751.97
        : remuneracaoClt * (alqInss / 100) - dedInss;
    var alqIr =
      remuneracaoClt - vlrInss <= 1903.98
        ? 0
        : remuneracaoClt - vlrInss >= 1903.99 &&
          remuneracaoClt - vlrInss <= 2826.65
        ? 7.5
        : remuneracaoClt - vlrInss >= 2826.66 &&
          remuneracaoClt - vlrInss <= 3751.06
        ? 15
        : remuneracaoClt - vlrInss >= 3751.06 &&
          remuneracaoClt - vlrInss <= 4664.68
        ? 22.5
        : 27.5;
    var dedIr =
      remuneracaoClt - vlrInss <= 1903.98
        ? 0
        : remuneracaoClt - vlrInss >= 1903.99 &&
          remuneracaoClt - vlrInss <= 2826.65
        ? 142.8
        : remuneracaoClt - vlrInss >= 2826.66 &&
          remuneracaoClt - vlrInss <= 3751.06
        ? 354.8
        : remuneracaoClt - vlrInss >= 3751.06 &&
          remuneracaoClt - vlrInss <= 4664.68
        ? 636.13
        : 869.36;
    var vlrIr = (remuneracaoClt - vlrInss) * (alqIr / 100) - dedIr;
    var remuneracaoPj = this.state.vlrPj;
    var simples = remuneracaoPj * 0.06;
    var contador = 200;

    return (
      <>
        <StatusBar barStyle={'light-content'} backgroundColor={'#212025'} />
        <LinearGradient
          colors={['#212025', '#0B0B0D']}
          style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.view}>
                <Image
                  source={require('./src/images/logo1.png')}
                  style={styles.image}
                />
              </View>
              <View style={styles.sliders}>
                <View style={styles.containerTextItem}>
                  <Text style={styles.textItemTitle}>Remuneração CLT:</Text>
                  <Text style={styles.textItemValue}>
                    R${' '}
                    {this.state.vlrClt
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Text>
                </View>
                <Slider
                  value={this.state.vlrClt}
                  minimumValue={0}
                  maximumValue={15000}
                  onValueChange={(r) => this.setState({vlrClt: r})}
                  minimumTrackTintColor="#36B378"
                  thumbTintColor="#505050"
                  style={styles.sliderItem}
                  step={50}
                />
                {/*aqui começa a parte do pj*/}
                <View style={styles.containerTextItem}>
                  <Text style={styles.textItemTitle}>Remuneração PJ:</Text>
                  <Text style={styles.textItemValue}>
                    R${' '}
                    {this.state.vlrPj
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Text>
                </View>
                <Slider
                  value={this.state.vlrPj}
                  minimumValue={0}
                  maximumValue={15000}
                  onValueChange={(r) => this.setState({vlrPj: r})}
                  minimumTrackTintColor="#36B378"
                  thumbTintColor="#505050"
                  style={styles.sliderItem}
                  step={50}
                />
              </View>
              {/*aqui começam os resultados*/}
              <ScrollView
                horizontal={true}
                style={styles.containerScroll}
                contentContainerStyle={styles.containerScrollContent}>
                {/*aqui começam os dados CLT*/}
                <View style={styles.containerScrollItem}>
                  <Text style={styles.dadosTitle}>Dados CLT</Text>
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>1 - FGTS </Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {fgts
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>2 - 13º (Provisão Mensal)</Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {decTerc
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>
                      3 - Férias (Provisão Mensal)
                    </Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {ferias
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>4 - INSS </Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {vlrInss
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>5 - Imposto de Renda</Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {vlrIr
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <Text />
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>6 - Remuneração Líquida</Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {(remuneracaoClt - vlrIr - vlrInss)
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <Text style={styles.dadosLegenda}>
                    {' '}
                    Remuneração (- 4) (- 5)
                  </Text>
                  <Text />
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>
                      7 - Custo Total Modalidade CLT
                    </Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {(remuneracaoClt + fgts + ferias + decTerc)
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                </View>
                {/*aqui começam os dados PJ*/}
                <View style={styles.containerScrollItem}>
                  <Text style={styles.dadosTitle}>Dados PJ</Text>
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>
                      1 - Tributos (Simples Nacional){' '}
                    </Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {simples
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>2 - Mensalidade Contador </Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {contador
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <Text />
                  <Text />
                  <Text />
                  <Text />
                  <Text />
                  <View style={styles.viewDados}>
                    <Text style={styles.dados}>3 - Remuneração Líquida </Text>
                    <Text style={styles.dadosIndice}>
                      R${' '}
                      {(remuneracaoPj - simples - contador)
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                  <Text style={styles.dadosLegenda}>
                    {' '}
                    Remuneração (- 1) (- 2)
                  </Text>
                </View>
                <Text />
              </ScrollView>
              <View style={styles.viewBtn}>
                <TouchableOpacity onPress={this.abrirModal}>
                  <Image
                    source={require('./src/images/botao.png')}
                    style={styles.imageBtn}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
        <Modal animationType="slide" visible={this.state.modalVisible}>
          <LinearGradient
            colors={['#212025', '#0B0B0D']}
            style={styles.container}>
            <ScrollView>
              <View style={styles.viewModal}>
                <Image
                  source={require('./src/images/logo1.png')}
                  style={styles.imageModal}
                />
                <Text style={styles.textModal}>
                  - Este aplicativo é destinado a profissionais do ramo da
                  tecnologia devido ao enquadramento no anexo III do Simples
                  Nacional que prevê a alíquota de 6%. {'\n'}
                  {'\n'}- O campo Custo Total Modalidade CLT representa o total
                  gasto pela empresa e funcionário com tal modalidade de
                  contratação considerando que a empresa faça uma "reserva" para
                  o futuro pagamento de férias e 13º.{'\n'}
                  {'\n'}- O campo Custo Total Modalidade CLT pode ser levado em
                  consideração para fins de negociação de valores de contratação
                  na modalidade PJ.{'\n'}
                  {'\n'} - A versão atual do aplicativo não contempla benefícios
                  pagos pela empresa ao trabalhador, como plano de saúde e vale
                  alimentação, porém tais fatores, mesmo que variáveis, devem
                  ser levados em consideração durante a negociação da modalidade
                  de contratação.{'\n'}
                  {'\n'} - O valor da mensalidade cobrada pelo contador varia de
                  profissional para profissional, porém, tendo em vista as
                  chamadas "contabilidades digitais" que oferecem serviços a
                  valores menores, estipulamos o valor de R$ 200,00 por
                  conservadorismo.
                </Text>
                <TouchableOpacity onPress={this.fecharModal}>
                  <Image
                    source={require('./src/images/btnvoltar.png')}
                    style={styles.imageBtnModal}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </LinearGradient>
        </Modal>
      </>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    alignItems: 'center',
    flex: 1,
  },
  sliders: {
    flex: 1,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: -20,
  },
  imageBtn: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  imageBtnModal: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  viewBtn: {
    alignItems: 'center',
  },
  textItemTitle: {
    color: 'white',
    flex: 1,
  },
  textItemValue: {
    color: 'white',
  },
  containerTextItem: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  sliderItem: {
    paddingLeft: 15,
  },
  containerScroll: {
    //backgroundColor: '#fff',
    height: 340,
    flex: 1,
  },
  containerScrollContent: {
    justifyContent: 'space-between',
  },
  containerScrollItem: {
    width: 330,
    height: 300,
    backgroundColor: '#267F56',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 0,
    borderRadius: 10,
  },
  dadosTitle: {
    marginLeft: 10,
    marginTop: 15,
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dados: {
    marginTop: 10,
    marginLeft: 15,
    color: '#FFF',
    fontSize: 13,
    flex: 1,
  },
  dadosIndice: {
    marginTop: 10,
    marginRight: 15,
    color: '#FFF',
    fontSize: 13,
    textAlign: 'right',
  },
  viewDados: {
    flexDirection: 'row',
  },
  dadosLegenda: {
    marginLeft: 30,
    color: '#FFF',
    fontSize: 9,
    fontStyle: 'italic',
  },
  viewModal: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
  },
  textModal: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'justify',
  },
  imageModal: {
    width: 150,
    height: 150,
    marginBottom: -20,
    marginTop: -20,
  },
});
